class APIError(Exception):
    """Base class for API errors."""
    def __init__(self, message, status_code=400):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)

class ValidationError(APIError):
    """Raised when request validation fails."""
    def __init__(self, message):
        super().__init__(message, 400)

class NotFoundError(APIError):
    """Raised when a resource is not found."""
    def __init__(self, message):
        super().__init__(message, 404)

class DatabaseError(APIError):
    """Raised when there's a database operation error."""
    def __init__(self, message="Database error"):
        super().__init__(message, 500)

def error_response(error):
    """Format an error as a JSON response."""
    return {
        'error': error.message,
        'status': error.status_code
    }, error.status_code
