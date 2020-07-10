const assert = require('assert')
import * as lodash from 'lodash'
import { User as User } from '../src/class/user'

const user = User.generate_mock(null)

describe("is_valid()", () => {
  it("should return true if all parameters match preset", () => {
    assert.equal(true, User.is_valid(user))
  })

  it("should return false if any parameters is null", () => {
    const without_first_name_test = lodash.clone(user)
    without_first_name_test.first_name = null

    assert.equal(false, User.is_valid(without_first_name_test))

    const without_last_name_test = lodash.clone(user)
    without_last_name_test.last_name = null

    assert.equal(false, User.is_valid(without_last_name_test))

    const without_birthdate_test = lodash.clone(user)
    without_birthdate_test.birthdate = null

    assert.equal(false, User.is_valid(without_birthdate_test))

    const without_email_test = lodash.clone(user)
    without_email_test.email = null

    assert.equal(false, User.is_valid(without_email_test))

    const without_password_test = lodash.clone(user)
    without_password_test.password = null

    assert.equal(false, User.is_valid(without_password_test))
  })

  it("should return false if user is null", () => {
    const user = null

    assert.equal(false, User.is_valid(user))
  })

  it("should return false if password length isn't between 8 and 40", () => {
    const under_8_length_password_test = lodash.clone(user)
    under_8_length_password_test.password = '1234567'

    assert.equal(false, User.is_valid(under_8_length_password_test))
  })


  it("should return false if first_name is not a string", () => {
    const user_test = lodash.clone(user)
    user_test.first_name = 3565

    assert.equal(false, User.is_valid(user_test))
  })

  it("should return false if last_name is not a string", () => {
    const user_test = lodash.clone(user)
    user_test.last_name = 3565

    assert.equal(false, User.is_valid(user_test))
  })

  it("should return false if email is not a string", () => {
    const user_test = lodash.clone(user)
    user_test.email = 3565

    assert.equal(false, User.is_valid(user_test))
  })

  it("should return false if password is not a string", () => {
    const user_test = lodash.clone(user)
    user_test.password = 3565

    assert.equal(false, User.is_valid(user_test))
  })

  it("should return false if date is not a date", () => {
    const wrong_password_test = lodash.clone(user)
    wrong_password_test.birthdate = 'dog'

    assert.equal(false, User.is_valid(wrong_password_test))
  })

  it("should return false if user age is under 13", () => {
    const wrong_birthdate_test = lodash.clone(user)
    wrong_birthdate_test.birthdate = '2010-05-10'

    assert.equal(false, User.is_valid(wrong_birthdate_test))
  })

  it("should return false if user email is messed up", () => {
    const messed_up_email_test = lodash.clone(user)
    messed_up_email_test.email = 'jo'

    assert.equal(false, User.is_valid(messed_up_email_test))

  })
})