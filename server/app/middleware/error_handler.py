from fastapi import Request
from fastapi.responses import JSONResponse
from fastapi import FastAPI
from app.core.exceptions import ServiceException
from app.core.logger import log


def register_exception_handlers(app: FastAPI):
    @app.exception_handler(ServiceException)
    async def service_exception_handler(request: Request, exc: ServiceException):
        log.error(f"ServiceException: {exc.code} - {exc.message}")
        return JSONResponse(status_code=400, content={
            'success': False,
            'error': {
                'code': exc.code,
                'message': exc.message,
            }
        })

    @app.exception_handler(Exception)
    async def generic_exception_handler(request: Request, exc: Exception):
        log.exception(f"Unhandled exception: {exc}")
        return JSONResponse(status_code=500, content={
            'success': False,
            'error': {
                'code': 'INTERNAL_ERROR',
                'message': 'An internal error occurred'
            }
        })
