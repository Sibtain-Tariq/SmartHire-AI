from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.core.logger import log
from app.dependencies import get_db_session

router = APIRouter()

@router.get('/ping')
async def ping():
    log.debug('Health check ping')
    return {"success": True, "data": "pong"}

@router.get('/db')
async def db_health(db: AsyncSession = Depends(get_db_session)):
    """
    Verifies that the application can successfully connect to PostgreSQL,
    create a session, execute a query, and cleanup the session.
    """
    try:
        # Execute a lightweight query to test connection
        result = await db.execute(text("SELECT 1"))
        value = result.scalar()
        
        if value == 1:
            log.info("Database health check passed.")
            return {
                "success": True, 
                "status": "connected",
                "message": "Successfully connected to PostgreSQL and verified session lifecycle."
            }
        else:
            raise ValueError("Database returned an unexpected response.")
            
    except Exception as e:
        log.error(f"Database health check failed: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database connection failed. Check your connection string and ensure PostgreSQL is running."
        )
