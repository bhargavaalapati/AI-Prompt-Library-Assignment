import { Routes } from '@angular/router';
// Notice we removed the ".component" from the paths and class names
import { PromptList } from './components/prompt-list/prompt-list';
import { PromptDetail } from './components/prompt-detail/prompt-detail';
import { AddPrompt } from './components/add-prompt/add-prompt';
import { Login } from './components/login/login';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/prompts', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'prompts', component: PromptList },
  { path: 'add-prompt', component: AddPrompt, canActivate: [authGuard] },
  { path: 'prompts/:id', component: PromptDetail }
];