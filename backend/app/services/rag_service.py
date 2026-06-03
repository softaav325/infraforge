from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import OllamaEmbeddings
from langchain_openai import ChatOpenAI
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQA
from app.core.config import settings
import os

class RAGService:
    def __init__(self):
        # Keep local embeddings for now as only LLM provider change was requested
        self.embeddings = OllamaEmbeddings(
            base_url=settings.OLLAMA_BASE_URL,
            model=settings.EMBEDDING_MODEL
        )
        
        # Switch to OpenRouter via ChatOpenAI
        self.llm = ChatOpenAI(
            openai_api_key=settings.OPENROUTER_API_KEY,
            openai_api_base=settings.OPENROUTER_BASE_URL,
            model=settings.OPENROUTER_MODEL,
            model_kwargs={
                "extra_headers": {
                    "HTTP-Referer": "https://infraforge.com", # Required by some OpenRouter models
                    "X-Title": "InfraForge AI"
                }
            }
        )
        
        self.vector_store = Chroma(
            persist_directory=settings.VECTOR_STORE_DIR,
            embedding_function=self.embeddings
        )

    async def process_document(self, filename: str, content: str):
        # Split text into chunks
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=100,
            length_function=len
        )
        chunks = text_splitter.split_text(content)
        
        # Add to vector store
        self.vector_store.add_texts(
            texts=chunks,
            metadatas=[{"source": filename}] * len(chunks)
        )
        self.vector_store.persist()
        return len(chunks)

    async def query(self, query: str, top_k: int = 3):
        # Create a retrieval chain
        retriever = self.vector_store.as_retriever(search_kwargs={"k": top_k})
        qa_chain = RetrievalQA.from_chain_type(
            llm=self.llm,
            chain_type="stuff",
            retriever=retriever,
            return_source_documents=True
        )
        
        result = qa_chain({"query": query})
        
        answer = result["result"]
        sources = list(set([doc.metadata.get("source", "Unknown") for doc in result["source_documents"]]))
        
        return answer, sources

rag_service = RAGService()
