'use strict'

const Validator = use('Validator')
const User = use('App/Model/User')
const Hash = use('Hash')

class UserController {

    * reg(request, response) {
        const bejelentkezve = yield request.auth.check()
        if (bejelentkezve) {
             response.redirect('/belepett')
        }
        yield response.sendView('reg')
    }

    * regel (request, response) {
        const regData = request.except('_csrf');
        const rules = {
            username: 'required|alpha_numeric|unique:users',
            email: 'required|email|unique:users',
            password: 'required|min:4',
            password_confirm: 'required|same:password',
        };

        const validation = yield Validator.validateAll(regData, rules)
        if (validation.fails()) {
            yield request
                .withAll()
                .andWith({errors: validation.messages()})
                .flash()
            response.redirect('back')
            return
        }

        const user = new User()
        user.username = regData.username;
        user.email = regData.email;
        user.password = yield Hash.make(regData.password) 
        yield user.save()
        yield request.auth.login(user)
        response.redirect('/belepett')
    }

    * belep(request, response) {
        const bejelentkezve = yield request.auth.check()
        if (bejelentkezve) {
            response.redirect('/belepett')
        }
        yield response.sendView('belep')
    }

    * belepes (request, response) {
        const username = request.input('username')
        const password = request.input('password')
        try {
            const login = yield request.auth.attempt(username, password) 
            if (login) {
                response.redirect('/belepett')
                return
            }
        }catch (err) {
            yield request
                .withAll()
                .andWith({errors: [{
                    message: 'Invalid credentails'
                }
                ]})
                .flash()
                response.redirect('/belep')
        }
    }

    * exit(request, response) {
        yield request.auth.logout()
        response.redirect('/fo')
    }

    * ajaxLogin(request, response) {
        const email = request.input('email')
        const password = request.input('password')

        try {
            const login = yield request.auth.attempt(email, password) 
            if (login) {
                response.send({ success: true })
                return
            }
        }catch (err) {s
            response.send({ success: false })
        }
    }
}

module.exports = UserController