from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from firebase_admin import auth as firebase_auth
from app.core.logger import log

class FirebaseAuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Extract token from Authorization header
        auth_header = request.headers.get('Authorization')
        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ', 1)[1].strip()
            try:
                decoded = firebase_auth.verify_id_token(token)
                # Attach user info to request.state for downstream use
                request.state.user = decoded
            except Exception as e:
                log.debug(f"Firebase token verification failed: {e}")
                # For protected routes, downstream handlers should check request.state.user
                request.state.user = None
        else:
            request.state.user = None

        response = await call_next(request)
        return response
