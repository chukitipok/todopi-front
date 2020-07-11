import * as faker from 'faker'
import { isNumber, isString, isArray, isDate } from 'lodash'


export function is_todolist_valid(todolist) {
  if (!todolist) return false

  const name = todolist.name

  if (!isString(name)) return false
  if (!name) return false
  return true
}

export function is_content_valid(content) {
  if (!content) return false

  const { name, amount } = content || {}

  if (!name || !amount) return false
  if (!isString(name)) return false
  if (!isNumber(amount)) return false

  return true
}

export function can_create_todolist(user) {
  if (!user) return false

  if (user.todolist) {
    return false
  }

  return true
}

export function generate_todolist_mock(item_amounts, last_add_time) {
  const name = faker.name.title()
  const todos = []
  const creation_time = new Date()

  while (item_amounts > 0) {
    todos.push(generate_content_mock())
    item_amounts--
  }

  return {
    name,
    todos,
    last_add_time,
    creation_time,
  }
}

export function generate_content_mock() {
  const name = faker.name.title()
  const amount = faker.random.number(1000)
  return { name, amount }
}

export function can_receive_item(todolist) {
  if (!todolist) {
    return false
  }

  if (!todolist.todos) return false
  if (!isArray(todolist.todos)) return false

  if (todolist.todos.length >= 10) {
    return false
  }

  const today = new Date()
  const range = new Date()

  if (todolist.last_add_time) {

    if (!isDate(todolist.last_add_time)) return false

    range.setTime(today.getTime() - todolist.last_add_time.getTime())
    if (range.getMinutes() < 30) {
      return false
    }
  }


  return true
}

/**
 * 
 * @param {Object} item 
 * @param {Object} todolist 
 */
export function can_add_item(item, todolist) {
  if (!item) return null
  if (!todolist) return null

  if (!item.name) return null
  if (!item.amount) return null

  if (!isNumber(item.amount)) return null

  const names = todolist.todos.map((x) => x.name)
  if (names.includes(item.name)) return null
  if (item.amount < 0 || item.amount > 1000) return null

  return item
}