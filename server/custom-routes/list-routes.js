let Tasks = require('../models/task')



module.exports = {
  tasksOnTheList: {
    path: '/lists/:listId/tasks',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find Tasks by ListID'
      Tasks.find({ listId: req.params.listId })
        .then(tasks => {
          res.send(handleResponse(action, tasks))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  taskInList: {
    path: '/lists/:listId/tasks',
    reqType: 'post',
    method(req, res, next) {
      let action = 'Create Task On List'
      Tasks.create(req.body)
        .then(task => {
          res.send(handleResponse(action, task))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
}

function handleResponse(action, data, error) {
  var response = {
    action: action,
    data: data
  }
  if (error) {
    response.error = error
  }
  return response
}