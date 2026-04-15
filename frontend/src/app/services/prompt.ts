import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromptService {
  private http = inject(HttpClient);
  // The proxy we set up earlier routes /api to localhost:8000
  private apiUrl = '/api/prompts/';

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
