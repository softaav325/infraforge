from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
import httpx
import os
from app.core.config import settings # Предполагаем, что API_KEY хранится здесь

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

# Конфигурация OpenRouter
OPENROUTER_API_KEY = getattr(settings, "openrouter_api_key", os.getenv("openrouter_api_key"))
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
# Модель может быть задана в конфиге, либо будет использована заглушка OpenRouter для авто-выбора
MODEL_NAME = getattr(settings, "openrouter_model", "openrouter/auto") 

@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    if not OPENROUTER_API_KEY:
        raise HTTPException(status_code=500, detail="OpenRouter API Key not configured")

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                url=OPENROUTER_URL,
                headers={
                    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                    "HTTP-Referer": "http://localhost:3000", # Обязательно для OpenRouter
                    "X-Title": "InfraForge Chat",
                    "Content-Type": "application/json"
                },
                json={
                    "model": MODEL_NAME,
                    "messages": [
                        {"role": "system", "content": "You are a helpful assistant for InfraForge project."},
                        {"role": "user", "content": request.message}
                    ]
                },
                timeout=30.0
            )
            
            if response.status_code != 200:
                raise HTTPException(status_code=response.status_code, detail=f"OpenRouter error: {response.text}")
            
            result = response.json()
            bot_message = result['choices'][0]['message']['content']
            
            return ChatResponse(response=bot_message)

    except httpx.RequestError as e:
        raise HTTPException(status_code=503, detail=f"API connection error: {str(e)}")
    except (KeyError, IndexError) as e:
        raise HTTPException(status_code=502, detail="Invalid response format from AI provider")
