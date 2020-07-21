import { Router } from 'express';
import * as users from '../models/users'
import { User } from '../class/user';
import { is_todolist_valid, can_create_todolist, is_content_valid, can_receive_item, can_add_item } from '../services/todolist.service';
const router = Router();
export default router;

router.post('/user/create', async (req, res) => {
  try {
    if (User.is_valid(req.body)) {
      const { first_name, last_name, birthdate, email, password } = req.body || {}
      console.log(req.body)

      const result = await users.model.create({
        first_name,
        last_name,
        email,
        password,
        birthdate: new Date(birthdate),
      })

      res.send({
        status: 'success',
        result,
      })
    } else {

      res.send({
        status: 'failure',
        message: "passed data wasn't complete",
      })
    }
  } catch (e) {
    res.send({
      status: "failure",
      message: e,
    })
  }
});

router.post('/user/login', async (req, res) => {
  console.log(req.body)
  try {
    const { email, password } = req.body || {}

    const user = await users.model.findOne({
      email, password
    });

    if (!user) {
      return res.send({
        status: 'failure',
        message: "user doesn't exist",
      })
    }

    return res.send({
      status: 'success',
      id: user._id,
    })
  } catch (e) {
    return res.send({
      status: "failure",
      message: e,
    })
  }
});

router.post('/user/:id/create_todolist', async (req, res) => {
  const user = await users.model.findById(req.params.id)

  if (is_todolist_valid(req.body) && can_create_todolist(user)) {
    user.todolist = {
      name: req.body.name,
      todos: [],
    }

    user.save()

    res.send({
      status: "success",
      result: user.todolist,
    })
  } else {

    res.send({
      status: 'failure',
      message: "passed data wasn't complete",
    })
  }

  const todolist_name = req.body.todolist_name


})

router.post('/user/:id/add_content', async (req, res) => {
  const user = await users.model.findById(req.params.id)

  if (!user) {
    return res.send({
      success: 'false',
      message: 'selected used do not exist',
    })
  }

  if (!can_receive_item(user.todolist)) {
    return res.send({
      success: 'false',
      message: 'You cannot add item yet'
    })
  }

  const content = req.body

  if (!is_content_valid(content)) {
    return res.send({
      success: 'false',
      message: 'data sent is incomplete or wrong',
    })
  }

  if (!can_add_item(content, user.todolist)) {
    return res.send({
      success: 'false',
      message: 'element could not be add to todolist'
    })
  }

  const { name, amount } = req.body

  user.todolist.todos.push({ name, amount })
  user.todolist.last_add_time = new Date()
  user.save()

  res.send({
    status: "success",
    result: user
  })
})

router.put('/user/:id/check', async (req, res) => {
  const user = await users.model.findById(req.params.id)

  if (!user) {
    return res.send({
      success: 'false',
      message: 'selected used do not exist',
    })
  }

  const element_name = req.body.element

  if (!element_name) {
    return res.send({
      success: 'false',
      message: 'Please provde an element [string]',
    })
  }

  const todos_name = user.todolist.todos.map(todo => todo.name)

  if (!todos_name.includes(element_name)) {
    return res.send({
      success: 'false',
      message: 'Please provide a valid content',
    })
  }

  user.todolist.todos.filter(todo => todo.name = element_name)[0].checked = true

  user.save()

  res.send({
    status: "success",
    result: user
  })
})