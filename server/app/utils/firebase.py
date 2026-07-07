import firebase_admin
from firebase_admin import credentials
from app.config.settings import settings
from app.core.logger import log

firebase_app = None

def init_firebase():
    global firebase_app
    if firebase_app is not None:
        return firebase_app
    cred_path = settings.FIREBASE_CREDENTIALS_PATH
    if not cred_path:
        log.warning('FIREBASE_CREDENTIALS_PATH not set; Firebase will not be initialized')
        return None
    cred = credentials.Certificate(cred_path)
    firebase_app = firebase_admin.initialize_app(cred)
    log.info('Firebase initialized')
    return firebase_app
