import { ORIGIN, PORT } from '../../../../config'
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
describe('刷新界面登录状态需要保持一致', () => {
    it('登录成功后刷新界面，登录状态成功', () => {
        cy.visit(`${ORIGIN}:${PORT}`)
        cy.login()
        cy.get('[data-test-id="登录"]').should('not.exist')
        cy.reload()
        cy.get('[data-test-id="登录"]').should('not.exist')
    })

    it('登出后刷新界面，登录状态为未登录', () => {
        cy.visit(`${ORIGIN}:${PORT}`)
        cy.login()
        cy.logout()
        cy.get('[data-test-id="登录"]').should('exist')
        cy.reload()
        cy.get('[data-test-id="登录"]').should('exist')
    })
})