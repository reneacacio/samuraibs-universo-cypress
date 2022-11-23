
import {el} from './elements'

class Header {
    userLoggedIn(UserName) {
        cy.get(el.fullName, { timeout: 12000 })
            .should('be.visible')
            .should('have.text', UserName)
    }
}

export default new Header()