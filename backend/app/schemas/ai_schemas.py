from pydantic import BaseModel, Field
from typing import List, Optional

class QueryRequest(BaseModel):
    query: str = Field(..., example="Как работает RAG?")
    top_k: Optional[int] = Field(default=3, ge=1, le=10)

class QueryResponse(BaseModel):
    answer: str
    sources: List[str] = []

class DatasetUploadRequest(BaseModel):
    filename: str
    content: str  # For simplicity in this version, we accept content as string, or can be extended to binary

class DatasetUploadResponse(BaseModel):
    message: str
    document_count: int
