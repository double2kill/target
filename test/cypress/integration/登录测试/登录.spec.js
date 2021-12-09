import {ORIGIN, PORT} from '../../../../config'
describe('登录测试', () => {
    it('首页登录成功', () => {
        cy.visit(`${ORIGIN}:${PORT}`)
        cy.login()
        cy.get('[data-test-id="登录"]').should('not.exist')
    })
    it('首页登出成功', () => {
        cy.visit(`${ORIGIN}:${PORT}`)
        cy.login()
        cy.logout()
        cy.get('[data-test-id="登录"]').should('exist')
    })
})