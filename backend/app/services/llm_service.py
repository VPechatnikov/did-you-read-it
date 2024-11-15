import httpx
import os
from ..models.quiz import Question, QuizRequest
from typing import List

async def generate_quiz(request: QuizRequest) -> List[Question]:
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://api.openai.com/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {os.getenv('OPENAI_API_KEY')}",
                "Content-Type": "application/json"
            },
            json={
                "model": "gpt-4",
                "messages": [{
                    "role": "system",
                    "content": "You are a helpful teaching assistant that creates multiple choice questions."
                }, {
                    "role": "user",
                    "content": f"""Create {request.num_questions} multiple choice questions based on this text: 
                                {request.text}
                                
                                Format the response as a JSON array with fields:
                                question, options (array of 4 choices), correctAnswer (index), explanation"""
                }]
            },
            timeout=30.0
        )
        
        result = response.json()
        # Parse the LLM response and convert to Question objects
        # Note: You'll need to adjust this based on your LLM's response format
        questions_data = result['choices'][0]['message']['content']
        # Parse questions_data from JSON string to list of Question objects
        return questions_data