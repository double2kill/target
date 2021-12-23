import {ORIGIN, PORT} from '../../../../config'
import dayjs from 'dayjs'
describe('Admin targetList 页面', () => {
    beforeEach(() => {
        cy.visit(`${ORIGIN}:${PORT}/#/admin/targetList`)
        cy.login()
    })

    it('1.表格增加数据成功，目标个数增加 2.编辑最后一条数据的目标内容成功 3.删除最后一条数据，目标个数和原来一样', () => {
        // 添加数据
        cy.get('[data-test-id="全部"]').click()
        cy.get('[data-test-id="表格"] tbody').find('tr').its('length').as('初始目标个数')
        cy.get('[data-test-id="添加"]').click()
        cy.get('[data-test-id="目标内容"] input').focus().type('【测试】添加一个小目标')
        cy.get('[data-test-id="用户名"] input').focus().type('测试专用号')
        const 计划完成时间 = dayjs().add(1, 'month').valueOf()
        cy.get('[data-test-id="计划完成时间"] input').focus().type(计划完成时间)
        cy.get('.n-dialog__action button.n-button--primary-type').click()
        cy.get('@初始目标个数').then(初始目标个数 => {
            cy.get('[data-test-id="表格"] tbody').find('tr').should("have.length", 初始目标个数 + 1);
        })
        // 编辑
        cy.get('[data-test-id="表格"] tbody').find('tr').last().find('[data-test-id="编辑"]').click()
        const 新文本 = '【测试】添加一个新的小目标 - 已编辑'
        cy.get('[data-test-id="目标内容"] input').focus().clear().type(新文本)
        cy.get('.n-dialog__action button.n-button--primary-type').click()
        cy.get('[data-test-id="表格"] tbody').find('tr').last().find('[data-col-key="目标内容"]').contains(新文本)
        // 删除
        cy.get('[data-test-id="表格"] tbody').find('tr').last().find('[data-test-id="删除"]').click()
        cy.get('.n-popconfirm__action .n-button--primary-type').click()
        cy.get('@初始目标个数').then(初始目标个数 => {
            cy.get('[data-test-id="表格"] tbody').find('tr').should("have.length", 初始目标个数);
        })
    })
})