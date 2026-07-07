# SmartHire AI - Backend (server)

This folder contains the FastAPI backend scaffold.

Quick start (local):

```bash
# create virtualenv
python -m venv .venv
. .venv/bin/activate  # or .venv\Scripts\activate on Windows

pip install -r requirements.txt

# copy environment
cp .env.example .env
# edit .env and set DATABASE_URL and FIREBASE_CREDENTIALS_PATH

uvicorn app.main:app --reload --port 8000
```

This scaffold includes:
- FastAPI application factory
- Async SQLAlchemy connection and DI
- Firebase auth helpers (stub)
- Basic middleware and error handling
- Logging via loguru

Note: Do not add business logic here. Implement services, repositories, and models under `app/`.
