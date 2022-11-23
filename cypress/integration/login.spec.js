
import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('login', function () {

    context('quando o usuário tem cadastro', function () {

        const user = {
            name: 'Jota Santos',
            email: 'jota@samuraibs.com',
            password: 'pwd123',
        }

        it('deve conseguir se logar', function () {

            loginPage.go()
            loginPage.form(user)
            loginPage.submit()
            dashPage.header.userLoggedIn(user.name)
       })
    })

})