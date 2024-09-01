import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {

  private apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${environment.API_KEY}`;

  constructor(private http: HttpClient) {}

  async generateMCQ(prompt: string): Promise<any> {
    const requestBody = {
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        temperature: 1,
        topK: 64,
        topP: 0.95,
        maxOutputTokens: 8192,
        responseMimeType: 'text/plain'
      }
    };

    try {
      if (!prompt) {
        throw new Error('Prompt is required.');
      }
      const response = await this.http.post<any>(this.apiUrl, requestBody).toPromise();
      // console.log('Response:', response);
      return response
    } catch (error) {
      console.error('Error generating MCQ:', error);
      throw error;
    }
  }

  
}
