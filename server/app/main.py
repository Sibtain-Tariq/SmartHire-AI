from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.logger import configure_logging
from app.config.settings import settings
from app.middleware.error_handler import register_exception_handlers
from app.api.v1.health import router as health_router

configure_logging()

app = FastAPI(title="SmartHire AI - Backend", version="1.0.0")

# CORS - allow configure via settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if settings.APP_ENV == 'development' else settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register exception handlers
register_exception_handlers(app)

# Include base routers
app.include_router(health_router, prefix="/api/v1/health", tags=["health"]) 

@app.on_event("startup")
async def startup_event():
    # Placeholder for startup tasks: DB connection warmup, firebase init, chroma init
    pass

@app.on_event("shutdown")
async def shutdown_event():
    # Placeholder for graceful shutdown: close DB, flush logs
    pass
