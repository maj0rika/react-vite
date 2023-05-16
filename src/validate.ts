export const emailvalidate = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  console.log(emailRegex.test(email))
  return emailRegex.test(email)
}

export const passwordvalidate = (password: string) => {
  const passwordRegExp = /^[\w]{6,12}$/
  return passwordRegExp.test(password)
}
