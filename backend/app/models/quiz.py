from pydantic import BaseModel
from typing import List, Optional

class QuizRequest(BaseModel):
    text: str
    num_questions: int = 5
    difficulty: Optional[str] = "medium"

class Question(BaseModel):
    question: str
    options: List[str]
    correct_answer: int
    explanation: str

class QuizResponse(BaseModel):
    questions: List[Question]