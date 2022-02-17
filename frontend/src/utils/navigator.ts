export const 是安卓引擎 = () => /Android/i.test(navigator.userAgent)
export const 是苹果手机引擎 = () => /iphone|iPad|iPod|iOS/i.test(navigator.userAgent)
export const 是手机设备 = () => 是安卓引擎() || 是苹果手机引擎()