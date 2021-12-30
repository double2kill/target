import {ORIGIN, PORT} from '../../../../config'
import dayjs from 'dayjs'
describe('测试首页', () => {
    beforeEach(() => {
        cy.visit(`${ORIGIN}:${PORT}`)
        cy.login()
    })

    const expectedTableTitle = ['目标内容', '计划完成时间', '完成时间','备注', '操作']
    it(`表格包含了标题[${expectedTableTitle}]`, () => {
        cy.get('.n-data-table-th').should(($tableTh) => {
            expect($tableTh).to.have.length(expectedTableTitle.length)
            const titleName = $tableTh.map((i, el) => {
                return el.textContent
            })
            expect(titleName.get()).to.deep.eq(expectedTableTitle)
        })

        cy.get('[data-test-id="添加目标"]').click()
        cy.get('.n-input__input-el').first().type('吃饭睡觉玩游戏')
        const 计划完成日期 = dayjs().format('YYYY-MM-DD')
        const 计划完成时间 = dayjs().add('5', 'hour').format('HH:mm')
        cy.get('[data-test-id="选择计划完成时间"]').clear().type(计划完成日期).type('{enter}')
        cy.get('[data-test-id="计划完成时间"]').click().type('{home}').type(计划完成时间).type('{end}{backspace}{backspace}{backspace}{backspace}{backspace}')
        // cy.get('[data-test-id="计划完成时间"]').clear().type(计划完成时间)
    })

})