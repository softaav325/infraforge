from pydantic_settings import BaseSettings
from pydantic import Field

class Settings(BaseSettings):
    APP_NAME: str = "InfraForge AI API"
    
    # OpenRouter Settings
    OPENROUTER_API_KEY: str = Field(default="", description="API Key for OpenRouter")
    OPENROUTER_BASE_URL: str = Field(default="https://openrouter.ai/api/v1", description="OpenRouter API Base URL")
    OPENROUTER_MODEL: str = Field(default="openrouter/auto", description="Model name to use for generation (openrouter/auto for automatic selection)")
    
    # Embedding Settings (Still using Ollama/local as per previous setup, but usually cloud for Vercel)
    OLLAMA_BASE_URL: str = Field(default="http://localhost:11434", description="URL of the Ollama server for embeddings")
    EMBEDDING_MODEL: str = Field(default="sentence-transformers/all-MiniLM-L6-v2", description="Model for creating embeddings")
    
    VECTOR_STORE_DIR: str = Field(default="./data/vector_store", description="Directory to store ChromaDB data")
    UPLOAD_DIR: str = Field(default="./data/uploads", description="Directory for uploaded documents")

    class Config:
        env_file = ".env"

settings = Settings()
