const HttpRequest = require('../helpers/http-response')

module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpRequest) {
    if (!httpRequest || !this.authUseCase || !this.authUseCase.auth) {
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
    const accessToken = this.authUseCase.auth(email, password)
    if (!accessToken) {
      return HttpRequest.unauthorized()
    }
    return HttpRequest.ok()
  }
}
