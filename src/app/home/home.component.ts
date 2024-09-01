import { Component } from '@angular/core';
import { GeminiService } from '../services/gemini.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  prompt: string = '';
  numberOfQuestions: number = 2;
  subjectType: string = 'Basic English';
  customSubject: string = '';
  generatedMCQs: any[] = [];
  selectedAnswers: string[] = [];
  showResults: boolean = false;
  submitted: boolean = false;

  // Options for dropdowns
  questionOptions = [1, 2, 3, 4, 5];
  subjectTypes = ['Basic English', 'Math', 'Science', 'Other'];

  constructor(private geminiService: GeminiService) {}

  onSubjectTypeChange() {
    if (this.subjectType === 'Other') {
      this.prompt = `Generate ${this.numberOfQuestions} MCQ questions along with options and the correct answer for the topic "${this.customSubject}", in JSON format. Please take care of the JSON format.`;
    } else {
      this.prompt = `Generate ${this.numberOfQuestions} MCQ questions along with options and the correct answer for the topic "${this.subjectType}", in JSON format. Please take care of the JSON format.`;
    }
  }

  async generateMCQ() {
    if (this.subjectType === 'Other' && !this.customSubject.trim()) {
      alert('Please provide a custom subject.');
      return;
    }
  
    try {
      const response = await this.geminiService.generateMCQ(this.prompt);
  
      // Extract the JSON string from the response
      let mcqJsonString = response.candidates[0].content.parts[0].text;
  
      // Clean and parse the JSON string
      mcqJsonString = mcqJsonString.replace(/^```json\n|\n```$/g, '');
      
      try {
        this.generatedMCQs = JSON.parse(mcqJsonString);
        this.selectedAnswers = new Array(this.generatedMCQs.length).fill(''); // Initialize answers
        this.showResults = true;
        this.submitted = false;
      } catch (jsonError) {
        console.error('Error parsing MCQ JSON:', jsonError);
        alert('There was an error parsing the MCQ data. Please try again.');
      }
    } catch (error) {
      console.error('Error generating MCQs:', error);
      alert('There was an error generating the MCQs. Please try again.');
    }
  }

  submitAnswer() {
    this.submitted = true;
  }
  


}
