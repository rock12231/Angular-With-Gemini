# MCQ with Gemini

**MCQ with Gemini** is an Angular application that generates multiple-choice questions (MCQs) using the Gemini API. Users can specify the number of questions, choose a subject, and input a custom subject if needed. The app then displays the generated MCQs and allows users to select answers and see the results.

## Features

- Generate MCQs based on a specified topic and number of questions.
- Choose from predefined subjects or enter a custom subject.
- Display generated MCQs with radio buttons for selecting answers.
- Show correct/incorrect feedback upon submission of answers.

## Technologies Used

- Angular 17
- Gemini API (Generative Language API)
- Bootstrap 4

## Installation

To run the MCQ with Gemini application, follow these steps:

1. **Node.js**: Ensure you have Node.js installed. You can download it from [Node.js official website](https://nodejs.org/).

2. **Angular CLI**: Install Angular CLI globally if you haven't already. Run the following command:
   ```bash
   npm install -g @angular/cli
    ```
3. **Clone the Repository**

    ```bash
    git clone https://github.com/your-username/MCQ-with-Gemini.git
    ```
4. **Project directory**
    ```
    cd MCQ-with-Gemini
    ```

5. **Obtain API Key** :Sign up or log in to your Gemini API provider and obtain an API key. This key is required for authenticating your requests to the API.
 [Gemini AI Studio](https://ai.google.dev/aistudio).

6. **Add API_KEY** : Navigate to the src/environments/ directory in your project
    ```typescript
    export const environment = {
        production: false,
        API_KEY: 'YOUR_GEMINI_API_KEY'
    };
    ```
2. **Run**
   ```
   ng serve
   ```


## Usage

This project allows you to generate and answer multiple-choice questions (MCQs) using the Gemini API. Follow these steps to use the application:

1. **Number of Questions:**
   - Select the number of MCQs you want to generate from the dropdown list.

2. **Subject Type:**
   - Choose a predefined subject from the dropdown list (e.g., Basic English, Math, Science).
   - If "Other" is selected, enter a custom subject in the provided input field.

3. **Custom Subject:**
   - If you selected "Other" in the Subject Type dropdown, enter your custom subject in the input field.

4. **Generate MCQs:**
   - Click the "Generate MCQs" button to generate the questions based on the selected options.

5. **Answer the MCQs:**
   - Select the answer for each question using radio buttons.
   - Click "Submit" to see the results and get feedback on your answers.

### Example

1. **Number of Questions:** Select `3` from the dropdown.
2. **Subject Type:** Choose `Math`.
3. **Generate MCQs:** Click the button to generate 3 MCQs related to Math.
4. **Answer the MCQs:** Select your answers and click `Submit` to view the results.

Make sure to provide a valid API key in the environment configuration to enable the generation of MCQs.

Enjoy testing your knowledge and refining your questions!


## Contact

For any questions, feedback, or support regarding this project, you can reach out to the following:

- **Avinash Kumar**: [Click here](https://github.com/rock12231)

Feel free to open an issue on the GitHub repository or contact me directly via email if you need assistance or have any suggestions.






