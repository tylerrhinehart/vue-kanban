let Comments = require('../models/comment')



module.exports = {
    commentOnTask : {
        path: '/tasks/:taskId/comments',
        reqType: 'get',
        method(req, res, next) {
          let action = 'Find Comments by TaskID'
          Comments.find({ taskId: req.params.taskId })
            .then(comments => {
              res.send(handleResponse(action, comments))
            }).catch(error => {
              return next(handleResponse(action, null, error))
            })
        }
    },  
    commentsInTasks: {
      path: '/tasks/:taskId/comments',
      reqType: 'post',
      method(req, res, next) {
        let action = 'Create Comment On Task'
        Comments.create(req.body)
          .then(comment => {
            res.send(handleResponse(action, comment))
          }).catch(error => {
            return next(handleResponse(action, null, error))
          })
      }
    }
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