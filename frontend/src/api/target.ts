import axios from 'axios'
import { TARGET_LIST } from '../../../constants/api'
import { loginUser } from '../components/Login/loginUser'

export const addTargetAPI = async ({目标内容, 计划完成时间}: {目标内容: string, 计划完成时间: number}) => {
  return axios.post(TARGET_LIST, {
    用户名: loginUser.用户名,
    目标内容,
    计划完成时间
  })
}