from fastapi import APIRouter, HTTPException, status
from app.schemas.ai_schemas import QueryRequest, QueryResponse, DatasetUploadRequest, DatasetUploadResponse
from app.services.rag_service import rag_service

router = APIRouter(prefix="/ai", tags=["AI Service"])

@router.post("/query", response_model=QueryResponse)
async def ask_ai(request: QueryRequest):
    try:
        # Provide default top_k if not specified
        top_k = request.top_k if request.top_k is not None else 3
        answer, sources = await rag_service.query(request.query, top_k)
        return QueryResponse(answer=answer, sources=sources)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"AI Service error: {str(e)}"
        )

@router.post("/upload", response_model=DatasetUploadResponse)
async def upload_dataset(request: DatasetUploadRequest):
    try:
        count = await rag_service.process_document(request.filename, request.content)
        return DatasetUploadResponse(
            message="Dataset processed and added to vector store",
            document_count=count
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Upload error: {str(e)}"
        )
