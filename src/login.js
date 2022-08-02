// #2 API em NodeJS com Clean Architecture e TDD - Decoupling Components
// Video: https://www.youtube.com/watch?v=sKcer-tzYtk

const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const AccountModel = mongoose.model('Account')

module.exports = () => {
    const router = new SingUpRouter()
    router.post('/signup', ExpressRouterAdapter.adapt(router) )
}

class ExpressRouterAdapter {
    static adapt (router) {
        return async (req, res) => {
            const httpRequest = {
                body: req.body
            }
            const httpResponse = await router.route(httpRequest)
            res.status(httpResponse.statusCode).json(httpResponse.body)
        }
    }
}

//Camada de presentation
// singnup-router
class SingUpRouter {
    async route (httpRequest) {
        const { email, password, repeatPassword } = httpRequest.body
        const user = new SingUpUserCase().singUp(email, password, repeatPassword)
        return {
            statusCode: 200,
            body: user
        }
        // return res.status(400).json({ error: 'passwor must be equal to repeatPassword' })
    }
}

// Domain
// signup-usecase
class SingUpUserCase {
    async singUp (email, password, repeatPassword) {
        if (password === repeatPassword) {
            new AddAccountRepository().addAccount(email, password)
        }
    }
}

// Infra
// add-account-repo
class AddAccountRepository {
    async addAccount(email, password) {
        const user = await AccountModel.create({ email, password })
        return res.json(user)
    }
}