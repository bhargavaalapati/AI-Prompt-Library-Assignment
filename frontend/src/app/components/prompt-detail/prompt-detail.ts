import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PromptService } from '../../services/prompt';

@Component({
  selector: 'app-prompt-detail',
  standalone: true,
  imports: [RouterLink, DatePipe],
  template: `
    <div style="max-width: 800px; margin: 20px auto; font-family: sans-serif;">
      <a routerLink="/prompts" style="color: #007bff; text-decoration: none; font-weight: bold; padding: 5px 0; display: inline-block;">&larr; Back to List</a>
      
      @if (prompt()) {
        <div style="margin-top: 20px; padding: 30px; border: 1px solid #e0e0e0; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); background: white;">
          <h1 style="margin: 0 0 15px 0; color: #333; font-size: 28px;">{{ prompt()?.title }}</h1>
          
          <div style="display: flex; gap: 15px; margin-bottom: 25px;">
            <span style="background: #f1f3f5; color: #495057; padding: 6px 15px; border-radius: 20px; font-size: 14px; font-weight: 500;">🧠 Complexity: {{ prompt()?.complexity }}/10</span>
            <span style="background: #e7f5ff; color: #1864ab; padding: 6px 15px; border-radius: 20px; font-size: 14px; font-weight: bold;">👁️ Views: {{ prompt()?.view_count }}</span>
          </div>
          
          <div style="background: #2b2b2b; color: #58a6ff; padding: 25px; border-radius: 8px; white-space: pre-wrap; font-family: monospace; font-size: 16px; line-height: 1.6; border-left: 4px solid #1864ab;">{{ prompt()?.content }}</div>
          
          <p style="color: #868e96; font-size: 13px; margin-top: 25px; border-top: 1px solid #eee; padding-top: 15px;">Added on: {{ prompt()?.created_at | date:'medium' }}</p>
        </div>
      }
      
      @if (error()) {
        <div style="color: #c92a2a; background: #fff5f5; padding: 15px; border-radius: 8px; margin-top: 20px; font-weight: bold; border: 1px solid #ffa8a8;">{{ error() }}</div>
      }
    </div>
  `
})
export class PromptDetail implements OnInit {
  route = inject(ActivatedRoute);
  promptService = inject(PromptService);
  
  
  prompt = signal<any>(null);
  error = signal<string>('');

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.promptService.getPrompt(id).subscribe({
        next: (data: any) => this.prompt.set(data),
        error: (err: any) => this.error.set('Failed to load prompt. Make sure the backend is running!')
      });
    }
  }
}