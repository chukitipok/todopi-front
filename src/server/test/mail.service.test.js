import { User as User } from '../src/class/user'
import * as lodash from 'lodash'
import * as assert from 'assert'
import { send } from '../src/services/email.service'

const user = User.generate_mock(null)

describe('send()', () => {


  it('should return false if user age is under 18', () => {
    const user_under_eighteen = lodash.clone(user)
    user_under_eighteen.birthdate = new Date('2005-02-01')

    assert.equal(false, send(user_under_eighteen))
  })

  it('should return true if user age is over 18', () => {
    const user_under_eighteen = lodash.clone(user)
    user_under_eighteen.birthdate = new Date('2000-02-01')

    assert.equal(true, send(user_under_eighteen))
  })

  it('should return false if user is null', () => {
    const null_user = null

    assert.equal(false, send(null_user))
  })

  it('should return false if user do not have a birthdate', () => {
    const null_date_user = lodash.clone(user)
    null_date_user.birthdate = null

    assert.equal(false, send(null_date_user))
  })

  it('should return false if birthdate is not a date', () => {
    const null_date_user = lodash.clone(user)
    null_date_user.birthdate = 'String'

    assert.equal(false, send(null_date_user))
  })
})