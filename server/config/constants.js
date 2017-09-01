const actions = {
  create: 'Create',
  update: 'Update',
  remove: 'Remove',
  find: 'Find',
  findAll: 'Find All'
}

const models = {
  board: {
    name: 'Board',
    endpoint: 'boards',
    preventDefaultApi: true,
    useCustomRoutes: true
  },
  list: {
    name: 'List',
    endpoint: 'lists',
    preventDefaultApi: true,
    useCustomRoutes: true
  },
  user: {
    name: 'User',
    endpoint: 'users',
    preventDefaultApi: true,
    useCustomRoutes: true
  },
  task: {
    name: 'Task',
    endpoint: 'tasks',
    preventDefaultApi: true,
    useCustomRoutes: true
  },
  comment: {
    name: 'Comment',
    endpoint: 'comments',
    // useCustomRoutes:true,
  }
}


module.exports = {
  actions,
  models
}