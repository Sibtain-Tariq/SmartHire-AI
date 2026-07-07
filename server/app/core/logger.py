from loguru import logger
from app.config.settings import settings
import sys

def configure_logging():
    logger.remove()
    level = settings.LOG_LEVEL.upper() if settings.LOG_LEVEL else 'INFO'
    logger.add(sys.stdout, level=level)
    # File logs - rotate daily, keep for 30 days
    logger.add('logs/server.log', rotation='00:00', retention='30 days', level=level)


# Expose a module-level logger
log = logger
