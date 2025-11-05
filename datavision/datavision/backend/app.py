from fastapi import FastAPI, HTTPException
from sqlmodel import SQLModel, Field, Session, create_engine, select
from typing import Optional, List
from datetime import datetime, timedelta
import pandas as pd

DATABASE_URL = "sqlite:///./datavision.db"
engine = create_engine(DATABASE_URL, echo=False, connect_args={"check_same_thread": False})

class Record(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    category: str
    value: float
    date: datetime

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

app = FastAPI(title='DataVision API', description='API de estatísticas com SQLite')

@app.on_event('startup')
def on_startup():
    create_db_and_tables()

@app.post('/seed')
def seed_data(days: int = 30):
    with Session(engine) as session:
        categories = ['Vendas', 'Marketing', 'Suporte', 'Operações']
        now = datetime.utcnow()
        import random
        for d in range(days):
            day = now - timedelta(days=d)
            for cat in categories:
                rec = Record(category=cat, value=round(50 + 200 * random.random(), 2), date=day)
                session.add(rec)
        session.commit()
    return {'ok': True, 'seeded_days': days}

@app.get('/records', response_model=List[Record])
def get_records(limit: int = 100):
    with Session(engine) as session:
        results = session.exec(select(Record).order_by(Record.date.desc()).limit(limit)).all()
        return results

@app.get('/stats/summary')
def summary_stats():
    with Session(engine) as session:
        rows = session.exec(select(Record)).all()
        if not rows:
            raise HTTPException(status_code=404, detail="No data. Run POST /seed to populate sample data.")
        df = pd.DataFrame([{'category': r.category, 'value': r.value, 'date': r.date} for r in rows])
        totals = df.groupby('category')['value'].sum().reset_index().to_dict(orient='records')
        df['date'] = pd.to_datetime(df['date']).dt.date
        last = df[df['date'] >= (pd.to_datetime('today').date() - pd.Timedelta(days=13))]
        timeseries = last.groupby(['date','category'])['value'].sum().reset_index()
        pivot = timeseries.pivot(index='date', columns='category', values='value').fillna(0).reset_index()
        pivot['date'] = pivot['date'].astype(str)
        return {'totals': totals, 'timeseries': pivot.to_dict(orient='records')}

@app.post('/records')
def create_record(rec: Record):
    with Session(engine) as session:
        session.add(rec)
        session.commit()
        session.refresh(rec)
        return rec
