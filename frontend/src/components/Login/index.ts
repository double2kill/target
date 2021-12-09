import { ref } from 'vue'

export const isLoginPopupShow = ref(false)
export const showLoginPopup = () => {
  isLoginPopupShow.value = true
}

export const loginFormRef = ref<any>(null)
export const setLoginFormRef = (ref: any) => {
  loginFormRef.value = ref
}