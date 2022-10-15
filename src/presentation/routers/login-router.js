const HttpRequest = require('../helpers/http-response')

module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  async route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return HttpRequest.badRequest('email')
      }
      if (!password) {
        return HttpRequest.badRequest('password')
      }
      const accessToken = await this.authUseCase.auth(email, password)
      if (!accessToken) {
        return HttpRequest.unauthorized()
      }
      return HttpRequest.ok({ accessToken })
    } catch (error) {
      return HttpRequest.serverError()
    }
  }
}
