export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }
  
  export interface QuizRequest {
    text: string;
    num_questions?: number;
    difficulty?: string;
  }
  
  export interface QuizResponse {
    questions: QuizQuestion[];
  }