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
  subjectType: string = 'Basic Math';
  customSubject: string = '';
  generatedMCQs: any[] = [];
  selectedAnswers: string[] = [];
  showResults: boolean = false;
  submitted: boolean = false;

  questionOptions = [1, 2, 3, 4, 5];
  subjectTypes = ['Basic English', 'Basic Math', 'Basic Science', 'Other'];

  constructor(private geminiService: GeminiService) {}

  onSubjectTypeChange() {
    if (this.subjectType === 'Other') {
      this.prompt = `Generate ${this.numberOfQuestions} MCQ questions along with options and the correct answer for the topic "${this.customSubject}",Do provide the json format. The json format should contains the following fields Question, Options and Answer.
      Example : [{"Question":"","Options":["Options1":"","Options2":"","Options3":"","Options4":""],"Answer":""},{"Question":"","Options":["Options1":"","Options2":"","Options3":"","Options4":""],"Answer":""}] Please follow the JSON format Example.`;
    } else {
      this.prompt = `Generate ${this.numberOfQuestions} MCQ questions along with options and the correct answer for the topic "${this.subjectType}",Do provide the json format. The json format should contains the following fields Question, Options and Answer.
      Example : [{"Question":"","Options":["Options1":"","Options2":"","Options3":"","Options4":""],"Answer":""},{"Question":"","Options":["Options1":"","Options2":"","Options3":"","Options4":""],"Answer":""}] Please follow the JSON format Example.`;
      }
  }

  async generateMCQ() {
    if (this.subjectType === 'Other' && !this.customSubject.trim()) {
      alert('Please provide a custom subject.');
      return;
    }
    if (this.numberOfQuestions > 1 && this.subjectType === 'Other' && !this.customSubject.trim()) {
      alert('Please provide a custom subject.');
      return;
    }
    
    try {
      const response = await this.geminiService.generateMCQ(this.prompt);
  
      // Extract the JSON string from the response
      let mcqJsonString = response.candidates[0].content.parts[0].text;

      // apply regex to remove the unwanted characters from the string "```json\n[\n  {\n    \"Question\": \"What is the smallest particle of an element that retains the chemical properties of that element?\",\n    \"Options\": {\n      \"Option1\": \"Atom\",\n      \"Option2\": \"Molecule\",\n      \"Option3\": \"Neutron\",\n      \"Option4\": \"Electron\"\n    },\n    \"Answer\": \"Option1\"\n  },\n  {\n    \"Question\": \"Which of the following states of matter has a definite shape and volume?\",\n    \"Options\": {\n      \"Option1\": \"Gas\",\n      \"Option2\": \"Liquid\",\n      \"Option3\": \"Solid\",\n      \"Option4\": \"Plasma\"\n    },\n    \"Answer\": \"Option3\"\n  },\n  {\n    \"Question\": \"What is the process by which plants convert sunlight into energy?\",\n    \"Options\": {\n      \"Option1\": \"Respiration\",\n      \"Option2\": \"Photosynthesis\",\n      \"Option3\": \"Transpiration\",\n      \"Option4\": \"Fermentation\"\n    },\n    \"Answer\": \"Option2\"\n  }\n]\n```"

      mcqJsonString = mcqJsonString.replace(/^```json\n|\n```$/g, '');
      console.log('MCQ JSON:', mcqJsonString);
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


  getOptionKeys(options: any): string[] {
    return Object.keys(options);
  }

  submitAnswer() {
    this.submitted = true;
  }


}
