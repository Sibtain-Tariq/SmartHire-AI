from fastapi import APIRouter
from app.core.logger import log

router = APIRouter()

@router.get('/ping')
async def ping():
    log.debug('Health check ping')
    return {"success": True, "data": "pong"}
