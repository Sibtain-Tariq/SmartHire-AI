import os
import logging
import firebase_admin
from firebase_admin import credentials, auth

logger = logging.getLogger(__name__)

def init_firebase():
    """
    Initialize Firebase Admin SDK.
    Uses Application Default Credentials if GOOGLE_APPLICATION_CREDENTIALS is set,
    or falls back to default initialization.
    """
    try:
        if not firebase_admin._apps:
            if os.environ.get("GOOGLE_APPLICATION_CREDENTIALS"):
                cred = credentials.ApplicationDefault()
                firebase_admin.initialize_app(cred)
                logger.info("Firebase Admin initialized with Application Default Credentials.")
            else:
                firebase_admin.initialize_app()
                logger.warning("Firebase Admin initialized without explicit credentials. Token verification will fail unless mock endpoints are used.")
    except Exception as e:
        logger.error(f"Failed to initialize Firebase Admin: {e}")

def verify_token(id_token: str) -> dict:
    """
    Verify Firebase ID token.
    Raises firebase_admin.auth.InvalidIdTokenError or ExpiredIdTokenError on failure.
    """
    return auth.verify_id_token(id_token)
