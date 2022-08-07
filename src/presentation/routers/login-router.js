const HttpRequest = require('../helpers/http-response')

module.exports = class LoginRouter {
  constructor(authUseCase) {
    this.authUseCase = authUseCase
  }

  route(httpRequest) {
    if (!httpRequest) {
      return HttpRequest.serverError()
    }
    if (!httpRequest.body) {
      return HttpRequest.serverError()
    }
    const { email, password } = httpRequest.body
    if (!email) {
      return HttpRequest.badRequest('email')
    }
    if (!password) {
      return HttpRequest.badRequest('password')
    }
    this.authUseCase.auth(email, password)
    return {
      statusCode: 401
    }
  }
}
