import { reactive } from 'vue'
import { LoginUser, LoginFormData, User } from '../type'
import axios from 'axios'
import {USER_LIST} from '../../../../constants/api'

export const loginUser = reactive<LoginUser>({
  用户名: localStorage.getItem('用户名') || ''
})

export const handleLogin = async (formData: LoginFormData) => {
  const { 用户名 } = formData
  const result = await axios.get<User[]>(USER_LIST)
  const 用户已存在 = result.data.some(item => item.用户名 === 用户名)
  if (用户已存在) {
    loginUser.用户名 = 用户名
    localStorage.setItem('用户名', 用户名)
    return
  }
  window.$message.error(
    '登录失败，用户不存在'
  )
  throw Error()
}

export const handleLogout = () => {
  loginUser.用户名 = ''
  localStorage.removeItem('用户名')
}