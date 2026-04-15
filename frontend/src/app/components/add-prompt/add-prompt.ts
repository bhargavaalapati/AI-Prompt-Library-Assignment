import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PromptService } from '../../services/prompt';

@Component({
  selector: 'app-add-prompt',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div style="max-width: 600px; margin: 0 auto;">
      <h2>Add New AI Prompt</h2>
      
      <form [formGroup]="promptForm" (ngSubmit)="onSubmit()" style="display: flex; flex-direction: column; gap: 15px;">
        
        <div>
          <label style="display: block; font-weight: bold; margin-bottom: 5px;">Title</label>
          <input formControlName="title" type="text" style="width: 100%; padding: 8px; box-sizing: border-box;" placeholder="e.g., Cyberpunk City">
          <div *ngIf="promptForm.get('title')?.touched && promptForm.get('title')?.invalid" style="color: red; font-size: 12px; margin-top: 5px;">
            Title is required and must be at least 3 characters.
          </div>
        </div>

        <div>
          <label style="display: block; font-weight: bold; margin-bottom: 5px;">Content</label>
          <textarea formControlName="content" rows="5" style="width: 100%; padding: 8px; box-sizing: border-box;" placeholder="Enter the detailed prompt..."></textarea>
          <div *ngIf="promptForm.get('content')?.touched && promptForm.get('content')?.invalid" style="color: red; font-size: 12px; margin-top: 5px;">
            Content is required and must be at least 20 characters.
          </div>
        </div>

        <div>
          <label style="display: block; font-weight: bold; margin-bottom: 5px;">Complexity (1-10)</label>
          <input formControlName="complexity" type="number" style="width: 100%; padding: 8px; box-sizing: border-box;">
          <div *ngIf="promptForm.get('complexity')?.touched && promptForm.get('complexity')?.invalid" style="color: red; font-size: 12px; margin-top: 5px;">
            Complexity must be between 1 and 10.
          </div>
        </div>

        <button type="submit" [disabled]="promptForm.invalid" style="padding: 10px; background: #333; color: white; border: none; border-radius: 4px; cursor: pointer;">Save Prompt</button>
        
        <div *ngIf="error" style="color: red; font-weight: bold;">{{ error }}</div>
      </form>
    </div>
  `
})
export class AddPrompt {
  fb = inject(FormBuilder);
  promptService = inject(PromptService);
  router = inject(Router);

  promptForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    content: ['', [Validators.required, Validators.minLength(20)]],
    complexity: [1, [Validators.required, Validators.min(1), Validators.max(10)]]
  });

  error = '';

  onSubmit() {
    if (this.promptForm.valid) {
      this.promptService.createPrompt(this.promptForm.value).subscribe({
        next: (data: any) => this.router.navigate(['/prompts']), // Redirect to list on success
        error: (err: any) => this.error = 'Failed to save. Check backend console.'
      });
    }
  }
}