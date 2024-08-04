class ErrorHandle extends Error {
  public statusCode: number
  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }

  getStatusCode() {
    return this.statusCode
  }

  getErrorMessage() {
    return this.message
  }

  static notFound(message: string) {
    return new ErrorHandle(message || "Not Found", 404)
  }

  static badRequest(message: string) {
    return new ErrorHandle(message || "Bad Request", 400)
  }

  static unauthorized(message: string) {
    return new ErrorHandle(message || "Unauthorized", 401)
  }

  static forbidden(message: string) {
    return new ErrorHandle(message || "Forbidden", 403)
  }

  static conflict(message: string) {
    return new ErrorHandle(message || "Conflict", 409)
  }

  static internal(message: string) {
    return new ErrorHandle(message || "Internal Server Error", 500)
  }

  static serviceUnavailable(message: string) {
    return new ErrorHandle(message || "Service Unavailable", 503)
  }

  static gatewayTimeout(message: string) {
    return new ErrorHandle(message || "Gateway Timeout", 504)
  }

  static custom(message: string, statusCode: number) {
    return new ErrorHandle(message, statusCode)
  }

  static fromError(error: Error) {
    return new ErrorHandle(error.message, 500)
  }

  static fromValidationError(error: Error) {
    return new ErrorHandle(error.message, 400)
  }

  static fromType(error: Error) {
    return new ErrorHandle(error.message, 400)
  }

  static fromMessage(message: string) {
    return new ErrorHandle(message, 400)
  }

  static fromStatusCode(statusCode: number) {
    return new ErrorHandle("Error", statusCode)
  }

  static fromStatusCodeAndMessage(statusCode: number, message: string) {
    return new ErrorHandle(message, statusCode)
  }

  static fromStatusCodeAndError(statusCode: number, error: Error) {
    return new ErrorHandle(error.message, statusCode)
  }
}

export { ErrorHandle }
