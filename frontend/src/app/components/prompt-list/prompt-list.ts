import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PromptService } from '../../services/prompt';

@Component({
  selector: 'app-prompt-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div style="max-width: 800px; margin: 0 auto;">
      <h2>All Prompts</h2>
      
      @if (prompts().length === 0) {
        <div>Loading prompts... or no prompts found. Add one!</div>
      } @else {
        @for (p of prompts(); track p.id) {
          <div style="border: 1px solid #ccc; padding: 15px; margin-bottom: 10px; border-radius: 5px; display: flex; justify-content: space-between; align-items: center; background: white;">
            <div>
              <h3 style="margin: 0 0 10px 0;">{{ p.title }}</h3>
              <span [style.backgroundColor]="p.complexity <= 3 ? 'green' : p.complexity <= 7 ? 'orange' : 'red'" 
                    style="color: white; padding: 5px 10px; border-radius: 15px; font-size: 12px;">
                Complexity: {{ p.complexity }}
              </span>
            </div>
            <a [routerLink]="['/prompts', p.id]" style="padding: 8px 15px; background: #333; color: white; text-decoration: none; border-radius: 4px;">View Details</a>
          </div>
        }
      }
    </div>
  `
})
export class PromptList implements OnInit {
  promptService = inject(PromptService);
  
  
  prompts = signal<any[]>([]);

  ngOnInit() {
    this.promptService.getPrompts().subscribe({
      next: (data: any) => {
        this.prompts.set(data);
      },
      error: (err: any) => console.error('Failed to fetch prompts', err)
    });
  }
}