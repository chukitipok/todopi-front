import { User as User } from '../src/class/user'
import * as lodash from 'lodash'
import * as todolist_service from '../src/services/todolist.service'
import * as assert from 'assert'

const user = User.generate_mock(null)

describe('todolist_service', () => {

  describe('can_create_todolist()', () => {
    it("should return false if a todolist is already created", () => {
      const will_already_have_a_todolist = lodash.clone(user)
      will_already_have_a_todolist.todolist = todolist_service.generate_todolist_mock(0, null)
      assert.equal(false, todolist_service.can_create_todolist(will_already_have_a_todolist))
    })

    it("should return false if user is null", () => {
      const null_user = null
      assert.equal(false, todolist_service.can_create_todolist(null_user))

    })

    it("should return true if user doesn't have a todolist", () => {
      const will_not_have_a_todolist = lodash.clone(user)
      assert.equal(true, todolist_service.can_create_todolist(will_not_have_a_todolist))

    })
  })

  describe('is_todolist_valid()', () => {

    it("should return true if todolist has a name", () => {
      const good_todolist = todolist_service.generate_todolist_mock(0, null)
      assert.equal(true, todolist_service.is_todolist_valid(good_todolist))
    })

    it("should return false if todolist doesn't have a name", () => {
      const todolist_without_name = {}
      assert.equal(false, todolist_service.is_todolist_valid(todolist_without_name))
    })

    it("should return false if todolist.name is not a string", () => {
      const todolist_without_name = { name: 13 }
      assert.equal(false, todolist_service.is_todolist_valid(todolist_without_name))
    })

    it("should return false if todolist is null", () => {
      const null_todolist = null
      assert.equal(false, todolist_service.is_todolist_valid(null_todolist))
    })

    it("should return false if todolist is undefined", () => {
      const null_todolist = undefined
      assert.equal(false, todolist_service.is_todolist_valid(null_todolist))
    })
  })

  describe('can_receive_item', () => {
    it("should return false if todolist is null in case user do not have todolist yet", () => {
      assert.equal(false, todolist_service.can_receive_item(null))
    })

    it("should return false if todolist todos is null", () => {
      const todolist_without_todos = todolist_service.generate_todolist_mock(0, null)
      todolist_without_todos.todos = null
      assert.equal(false, todolist_service.can_receive_item(todolist_without_todos))
    })

    it("should return false if todolist todos is not an array", () => {
      const todolist_without_todos = todolist_service.generate_todolist_mock(0, null)
      todolist_without_todos.todos = 'testString'
      assert.equal(false, todolist_service.can_receive_item(todolist_without_todos))
    })

    it("should return false if todolist has a list_add_time and it's not a date", () => {
      const todolist_without_todos = todolist_service.generate_todolist_mock(0, 'Test')
      assert.equal(false, todolist_service.can_receive_item(todolist_without_todos))
    })

    it("should return false if todolist size >= 10", () => {
      assert.equal(false, todolist_service.can_receive_item(todolist_service.generate_todolist_mock(10, null)))
    })

    it("should return false if todolist last add date is < 30 minutes", () => {
      const twenty_minutes_earlier = new Date()
      twenty_minutes_earlier.setMinutes(twenty_minutes_earlier.getMinutes() - 20)

      const todolist = todolist_service.generate_todolist_mock(3, twenty_minutes_earlier)
      assert.equal(false, todolist_service.can_receive_item(todolist))
    })

    it("should return true if todolist can receive item and if last add item is over 30 minutes", () => {
      const over_thirty_minutes_time = new Date()
      over_thirty_minutes_time.setMinutes(over_thirty_minutes_time.getMinutes() - 40)

      const todolist = todolist_service.generate_todolist_mock(5, over_thirty_minutes_time)
      assert.equal(true, todolist_service.can_receive_item(todolist))
    })
  })

  describe('is_content_valid()', () => {
    it('should return true if name and content are present', () => {
      assert.equal(true, todolist_service.is_content_valid(todolist_service.generate_content_mock()))
    })

    it('should return false if name or content are not present', () => {
      const content_without_name = todolist_service.generate_content_mock()
      content_without_name.name = null
      assert.equal(false, todolist_service.is_content_valid(content_without_name))

      const content_without_amount = todolist_service.generate_content_mock()
      content_without_amount.amount = null
      assert.equal(false, todolist_service.is_content_valid(content_without_amount))
    })

    it('should return false if name is not a string', () => {
      const name_is_number = todolist_service.generate_content_mock()
      name_is_number.name = 123456
      assert.equal(false, todolist_service.is_content_valid(name_is_number))
    })

    it('should return false if amount is not a number', () => {
      const amount_is_string = todolist_service.generate_content_mock()
      amount_is_string.amount = "123456"
      assert.equal(false, todolist_service.is_content_valid(amount_is_string))
    })

    it('should return false of content is null', () => {
      const null_content = null
      assert.equal(false, todolist_service.is_content_valid(null_content))
    })
  })


  describe('can_add_item()', () => {
    it('should return item if item is not yet in todolist and amount is < 1000', () => {
      const todolist = todolist_service.generate_todolist_mock(0, null)
      const content = todolist_service.generate_content_mock()

      assert.equal(content, todolist_service.can_add_item(content, todolist))
    })

    it('should return null if item is null', () => {
      const todolist = todolist_service.generate_todolist_mock(4, null)
      const content = null

      assert.equal(null, todolist_service.can_add_item(content, todolist))
    })

    it('should return null if todolist is null', () => {
      const todolist = null
      const content = todolist_service.generate_content_mock()

      assert.equal(null, todolist_service.can_add_item(content, todolist))
    })

    it('should return null if item is undefined', () => {
      const todolist = todolist_service.generate_todolist_mock(4, null)
      const content = undefined

      assert.equal(null, todolist_service.can_add_item(content, todolist))
    })

    it('should return null if todolist is undefined', () => {
      const todolist = undefined
      const content = todolist_service.generate_content_mock()

      assert.equal(null, todolist_service.can_add_item(content, todolist))
    })


    it('should return null if item.name is undefined or null', () => {
      const todolist = todolist_service.generate_todolist_mock(4, null)
      const content = undefined

      assert.equal(null, todolist_service.can_add_item(content, todolist))
    })


    it('should return null if item.amount is undefined or null', () => {
      const todolist = todolist_service.generate_todolist_mock(4, null)
      const content = undefined

      assert.equal(null, todolist_service.can_add_item(content, todolist))
    })


    it('should return null if amount is not a number', () => {
      const todolist = todolist_service.generate_todolist_mock(4, null)
      const content = todolist_service.generate_content_mock()
      content.amount = '500'

      assert.equal(null, todolist_service.can_add_item(content, todolist))
    })

    it('should return null if amount > 1000', () => {
      const todolist = todolist_service.generate_todolist_mock(4, null)
      const content = todolist_service.generate_content_mock()
      content.amount = 6000

      assert.equal(null, todolist_service.can_add_item(content, todolist))
    })


    it('should return null if item name is already present in list', () => {
      const todolist = todolist_service.generate_todolist_mock(4, null)
      const content = todolist_service.generate_content_mock()
      content.name = todolist.todos[0].name

      assert.equal(null, todolist_service.can_add_item(content, todolist))
    })
  })
})



