import { isDate } from "lodash"

export function send(user) {
  if (!user) return false
  if (!user.birthdate) return false

  if (!isDate(user.birthdate)) return false

  const today = new Date()

  const range = today.getFullYear() - user.birthdate.getFullYear()
  if (range < 18) return false

  return true
}