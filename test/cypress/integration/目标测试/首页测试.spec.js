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

        //添加三个目标
        const targets = ['吃饭', '睡觉', '玩游戏']
        // for (let index = 0; index < 3; index++) {
        //     cy.get('[data-test-id="添加目标"]').click()
        //     cy.get('.n-input__input-el').first().type(targets[index])
        //     const 计划完成日期 = dayjs().format('YYYY-MM-DD')
        //     const subMin = dayjs().minute()%15 + 15 * index
        //     const 计划完成时间 = dayjs().add(index*1.5, 'hour').subtract(subMin, 'minute').format('HH:mm')
        //     cy.get('[data-test-id="选择计划完成时间"]').clear().type(计划完成日期).type('{enter}')
        //     cy.get('[data-test-id="计划完成时间"] input').click().type('{home}').type(计划完成时间).type('{end}{backspace}{backspace}{backspace}{backspace}{backspace}{enter}')
        //     cy.get('[data-test-id="添加按钮"]').click()
        // }

        //查看是否添加成功
        cy.get('.n-data-table-table').find('tr').its('length').should('eq', targets.length + 1)


        // cy.get('.n-data-table-table').find('tr').should(($tableTr) => {
        //     $tableTr.map((i, el) => {
        //         console.log(i)
        //         if (i != 0) {
        //             return cy.get(el).get('[data-test-id="完成"]').click()
        //         }
        //     })
        // })

        const addRows = cy.get('.n-data-table-table').get('tr')
        console.log(addRows)

        for (let index = 1; index <= targets.length; index++) {
            addRows[index].get().get('[data-test-id="完成"]').click()
        }

    })

})