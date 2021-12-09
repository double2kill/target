export const requiredValueValidator = (rule: any, value: any) => {
  const {field} = rule
  if (!value) {
    return new Error(`${field}必填`)
  }
  return true
}