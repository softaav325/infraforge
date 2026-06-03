from fastapi import FastAPI
from app.api.ai_router import router as ai_router
from app.core.config import settings

app = FastAPI(
    title=settings.APP_NAME,
    description="Production-ready AI API with RAG using Ollama and ChromaDB"
)

# Include AI routes
app.include_router(ai_router)

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": settings.APP_NAME}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
