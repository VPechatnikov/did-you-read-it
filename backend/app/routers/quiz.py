from fastapi import APIRouter, HTTPException
from ..models.quiz import QuizRequest, QuizResponse
from ..services.llm_service import generate_quiz

router = APIRouter()

@router.post("/generate", response_model=QuizResponse)
async def create_quiz(request: QuizRequest):
    try:
        questions = await generate_quiz(request)
        return QuizResponse(questions=questions)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))