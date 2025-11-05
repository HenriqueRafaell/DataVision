# DataVision Backend (FastAPI + SQLite)

## Setup (local, rápido)
1. Create a virtualenv and activate it (recommended).
2. Install dependencies:
```
pip install -r requirements.txt
```
3. Seed sample data (optional):
```
uvicorn app:app --reload
# Em outro terminal, use curl or Postman:
curl -X POST http://localhost:8000/seed?days=30
```
4. Run the server:
```
uvicorn app:app --reload --port 8000
```

Endpoints:
- POST /seed?days=30 -> popula dados de exemplo
- GET /records -> lista de registros
- GET /stats/summary -> resumo (totais por categoria + timeseries)
- POST /records -> criar um registro (ex: category, value, date)

Observação: usamos **SQLite** (arquivo `datavision.db`) para simplificar execução local.
