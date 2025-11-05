# DataVision — Dashboard de Estatísticas (FastAPI + SQLite + React)



## Como usar (rápido)
1. Backend:
   - cd backend
   - pip install -r requirements.txt
   - uvicorn app:app --reload --port 8000
   - (opcional) curl -X POST http://localhost:8000/seed?days=30 to populate sample data
2. Frontend:
   - cd frontend
   - npm install
   - npm run dev (Vite serve at http://localhost:5173)

## Estrutura
- backend/ - API FastAPI
- frontend/ - React dashboard
