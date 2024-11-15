import { Card, CardContent, Typography } from '@mui/material';
import { QuizQuestion as QuizQuestionType } from '@/types/quiz';

interface QuizQuestionProps {
  question: QuizQuestionType;
  index: number;
  selectedAnswer?: number;
  onSelectAnswer: (index: number) => void;
  showResults: boolean;
}

export const QuizQuestion = ({
  question,
  index,
  selectedAnswer,
  onSelectAnswer,
  showResults,
}: QuizQuestionProps) => (
  <Card>
    <CardContent>
      <Typography variant="body1" gutterBottom>
        Question {index + 1}: {question.question}
      </Typography>

      <div className="space-y-2">
        {question.options.map((option, oIndex) => (
          <div
            key={oIndex}
            className={`p-3 border rounded cursor-pointer hover:bg-gray-50
              ${selectedAnswer === oIndex ? 'border-blue-500 bg-blue-50' : ''}
              ${showResults ? 
                oIndex === question.correctAnswer ? 'border-green-500 bg-green-50' :
                selectedAnswer === oIndex ? 'border-red-500 bg-red-50' : ''
              : ''}`}
            onClick={() => !showResults && onSelectAnswer(oIndex)}
          >
            {option}
          </div>
        ))}
      </div>

      {showResults && (
        <Typography sx={{ mt: 2 }} color="text.secondary">
          {question.explanation}
        </Typography>
      )}
    </CardContent>
  </Card>
);