import * as faker from 'faker'
import { isString, last } from 'lodash'

const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


export class User {

  static registration_age_limit = 13

  constructor(user) {
    this.first_name = user.first_name
    this.last_name = user.last_name
    this.birthdate = user.birthdate
    this.email = user.email
    this.password = user.password
  }

  static generate_mock(todolist) {
    const first_name = faker.name.firstName()
    const last_name = faker.name.lastName()
    const birthdate = faker.date.between('1980-05-01', '2000-05-01')
    const email = faker.internet.email(first_name, last_name, faker.internet.domainName())
    const password = faker.internet.password(10)

    const user = new User(
      {
        first_name,
        last_name,
        birthdate,
        email,
        password,
        todolist,
      })

    return user
  }

  static is_valid(user) {
    if (!user) return false

    const { first_name, last_name, email, birthdate, password } = user || {}
    if (!first_name) return false
    if (!last_name) return false
    if (!email) return false
    if (!birthdate) return false
    if (!password) return false

    if (!isString(first_name)) return false
    if (!isString(last_name)) return false
    if (!isString(email)) return false
    if (!isString(password)) return false

    const today = new Date()
    const birthdate_date = new Date(birthdate)
    if (isNaN(birthdate_date.getTime())) return false

    if (password.length < 8 || password.length > 40) return false

    if (!email_regex.test(email)) return false

    const range = today.getFullYear() - birthdate_date.getFullYear()
    if (range < User.registration_age_limit) return false

    return true
  }
}