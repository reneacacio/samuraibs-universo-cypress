
import { faker } from '@faker-js/faker'
import signupPage from '../support/pages/signup'

describe('cadastro', function () {

    context('quando o usuário é novato', function () {

        const user = {
            name: 'Rene Acacio',
            email: 'reneacacio@gmail.com',
            password: '321654',
            is_provider: true // Propriedade identificada no envio do json via interceptação no network
        }

        before(function () {

            cy.task('removeUser', user.email)
                .then(function (result) { // Pegando o resultado da promessa
                    console.log(result)
                })
        })

        it('deve cadastrar um novo usuário', function () {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        })
    })

    context('não deve cadastrar um novo usuário', function () {
        // Criando usuário exclusivo para esse cenário, caso tereceiros alterem nossa massa de testes
        // Dessa forma o próprio cenário se resolve e sempre teremos a massa ideal para testes    
        const user = {
            name: 'Rene Acacio',
            email: 'reneacacio@gmail.com',
            password: '321654',
            is_provider: true // Propriedade identificada no envio do json via interceptação no network
        }

        before(function () {

            // Primeiro removemos o usuário caso já exista na base de dados
            cy.task('removeUser', user.email)
                .then(function (result) { // Pegando o resultado da promessa
                    console.log(result)
                })

            // Fazendo o post do usuário para nosso cenário        
            cy.request(
                'POST',
                'http://localhost:3333/users',
                user
            )

        })

        it('deve exibir email já cadastrado', function () {

            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')

        })
    })

    context('quando o email é incorreto', function () {

        const user = {
            name: 'Elizabeth Olsen',
            email: 'liza.yahoo.com',
            password: '321654'
        }


        it('deve exibir mensagem de alerta', function () {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.alertHaveText('Informe um email válido')
        })
    })

    context('quando a senha é muito curta', function () {

        const passwords = ['1', '11', '111', '1111', '11111'];

        beforeEach(function () {
            signupPage.go()
        })

        passwords.forEach(function (p) {

            it('não deve cadastrar com a senha ' + p, function () {
                const user = { name: 'Json Friday', email: 'json@gmail.com', password: p }

                signupPage.form(user)
                signupPage.submit()
            })
        })

        afterEach(function () {
            signupPage.alertHaveText('Pelo menos 6 caracteres')
        })
    })

    context('quando não preencho nenhum dos campos', function () {

        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function () {
            signupPage.go()
            signupPage.submit()
        })

        alertMessages.forEach(function (alert) {
            it('deve exibir "' + alert.toLocaleLowerCase() + '"', function () {
                signupPage.alertHaveText(alert) 
            })
        })
    })

})


