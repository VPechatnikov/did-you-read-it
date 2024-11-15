import { Button } from '@mui/material';
import { Alert } from '@mui/material';
import { Loader2 } from 'lucide-react';
import { TextInput } from './TextInput';
import { QuizQuestion } from './QuizQuestion';
import { QuizResults } from './QuizResults';
import { useQuiz } from '@/hooks/useQuiz';

export const QuizGenerator = () => {
  const {
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
  } = useQuiz();

  return (
    <>
      <TextInput value={text} onChange={setText} disabled={loading} />
      
      <div className="mt-4">
        <Button
          variant="contained"
          onClick={handleGenerate}
          disabled={loading || !text}
          fullWidth
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Questions...
            </>
          ) : (
            'Generate Quiz'
          )}
        </Button>
      </div>

      {error && (
        <div className="mt-4">
          <Alert severity="error">{error}</Alert>
        </div>
      )}
      
      {questions.length > 0 && !showResults && (
        <div className="mt-4 space-y-4">
          {questions.map((question, index) => (
            <QuizQuestion
              key={index}
              question={question}
              index={index}
              selectedAnswer={selectedAnswers[index]}
              onSelectAnswer={(answer) => handleAnswerSelect(index, answer)}
              showResults={false}
            />
          ))}
          <Button 
            variant="contained"
            onClick={() => setShowResults(true)}
            fullWidth
          >
            Submit Quiz
          </Button>
        </div>
      )}

      {showResults && (
        <div className="mt-4">
          <QuizResults
            questions={questions}
            selectedAnswers={Object.values(selectedAnswers)}
            score={calculateScore()}
          />
        </div>
      )}
    </>
  );
};