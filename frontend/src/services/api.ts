/// <reference types="vite/client" />

import { QuizRequest, QuizResponse } from '../types/quiz';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const generateQuiz = async (request: QuizRequest): Promise<QuizResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/quiz/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to generate quiz');
  }

  return response.json();
};