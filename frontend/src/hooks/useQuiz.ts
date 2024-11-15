import { useState } from 'react';
import { QuizQuestion } from '../types/quiz';
import { generateQuiz } from '../services/api';

export const useQuiz = () => {
  const [text, setText] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleGenerate = async () => {
    try {
      setError(null);
      setLoading(true);
      setQuestions([]);
      setSelectedAnswers({});
      setShowResults(false);

      const response = await generateQuiz({
        text,
        num_questions: 5
      });

      setQuestions(response.questions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    if (!showResults) {
      setSelectedAnswers(prev => ({
        ...prev,
        [questionIndex]: answerIndex
      }));
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  return {
    text,
    setText,
    questions,
    loading,
    error,
    selectedAnswers,
    showResults,
    setShowResults,
    handleGenerate,
    handleAnswerSelect,
    calculateScore,
  };
};