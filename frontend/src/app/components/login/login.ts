import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div style="max-width: 400px; margin: 50px auto; padding: 30px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      <h2 style="text-align: center; margin-bottom: 20px;">Admin Login</h2>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" style="display: flex; flex-direction: column; gap: 15px;">
        <div>
          <label style="font-weight: bold;">Username</label>
          <input formControlName="username" type="text" style="width: 100%; padding: 10px; margin-top: 5px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px;">
        </div>
        <div>
          <label style="font-weight: bold;">Password</label>
          <input formControlName="password" type="password" style="width: 100%; padding: 10px; margin-top: 5px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px;">
        </div>
        <button type="submit" [disabled]="loginForm.invalid" style="padding: 12px; background: #1864ab; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">Login</button>
        <div *ngIf="error" style="color: red; text-align: center; margin-top: 10px;">{{ error }}</div>
      </form>
    </div>
  `
})
export class Login {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  error = '';

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => this.router.navigate(['/prompts']),
        error: () => this.error = 'Invalid credentials!'
      });
    }
  }
}