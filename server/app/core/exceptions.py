from fastapi import HTTPException

class ServiceException(Exception):
    def __init__(self, message: str, code: str = 'SERVICE_ERROR'):
        self.message = message
        self.code = code
        super().__init__(message)

class NotFoundException(ServiceException):
    def __init__(self, message: str = 'Resource not found'):
        super().__init__(message, code='NOT_FOUND')

class UnauthorizedException(ServiceException):
    def __init__(self, message: str = 'Unauthorized'):
        super().__init__(message, code='UNAUTHORIZED')
