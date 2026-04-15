import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromptService {
  private http = inject(HttpClient);
  private apiUrl = 'https://ai-prompt-library-assignment.onrender.com/api/prompts/';

  getPrompts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getPrompt(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/`);
  }

  createPrompt(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
