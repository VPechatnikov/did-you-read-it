import { Card, CardContent } from '@mui/material';

interface QuizResultsProps {
  score: number;
  total: number;
}

export const QuizResults = ({ score, total }: QuizResultsProps) => (
  
    
      
        Score: {score} out of {total}
        {' '}({((score / total) * 100).toFixed(1)}%)
      
    
  
);