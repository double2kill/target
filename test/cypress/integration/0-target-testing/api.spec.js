import {TARGET_LIST, USER_LIST} from '../../../../constants/api.ts'
import {ORIGIN, PORT} from '../../../../config'

describe('测试API', () => {
    const apiList = [
        `${ORIGIN}:${PORT}${TARGET_LIST}`,
        `${ORIGIN}:${PORT}${USER_LIST}`,
    ]

    apiList.forEach(api => {
        it(`${api} 可以访问`, () => {
            cy.request(api).its('headers').its('content-type').should('include', 'application/json')
        })
    })
})