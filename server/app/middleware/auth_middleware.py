from fastapi import Request
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from app.core.auth import verify_token
from firebase_admin import auth as firebase_auth
from app.core.logger import log

class FirebaseAuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Extract token from Authorization header
        auth_header = request.headers.get('Authorization')
        request.state.user = None
        
        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ', 1)[1].strip()
            try:
                decoded = verify_token(token)
                request.state.user = decoded
            except firebase_auth.ExpiredIdTokenError:
                return JSONResponse(
                    status_code=401,
                    content={"detail": "Authentication token has expired."}
                )
            except firebase_auth.InvalidIdTokenError:
                return JSONResponse(
                    status_code=401,
                    content={"detail": "Invalid authentication token."}
                )
            except Exception as e:
                log.error(f"Firebase token verification failed: {e}")
                return JSONResponse(
                    status_code=401,
                    content={"detail": "Authentication failed."}
                )

        response = await call_next(request)
        return response
