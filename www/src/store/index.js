import axios from 'axios'
import vue from 'vue'
import vuex from 'vuex'
import router from '../router'

let api = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 2000,
  withCredentials: true
})

let auth = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 2000,
  withCredentials: true
})
vue.use(vuex)

var store = new vuex.Store({
  state: {
    boards: [],
    activeBoard: {},
    activeLists: [],
    tasks: {},
    comments: {},
    error: {},
    user: {},
    loggedIn: false,
  },
  mutations: {
    setBoards(state, data) {
      state.boards = data
    },
    handleError(state, err) {
      state.error = err
    },
    setActiveBoard(state, board) {
      state.activeBoard = board
    },
    setLists(state, lists) {
      var sortedLists = lists.sort(function (a, b) {
        return a.position - b.position
      })
      state.activeLists = sortedLists
    },
    removeTask(state, task) {
      debugger
      var list = state.activeLists.find((list) => {
        if (list._id == task.data.data.listId) {
          return list
        }
      })
      list.task.data.data.splice(list.task.data.data.indexOf(task), 1)
      console.log(list)
      // state.activeLists[listIndex].tasks.data.data.splice(findIndex(task), 1)

    },
    setComments(state, comments) {
      var sortedComments = comments.data.sort(function (a, b) {
        return a.position - b.position
      })
      vue.set(state.comments, comments.taskId, sortedComments)
    },
    setTasks(state, tasks) {
      vue.set(state.tasks, tasks.listId, tasks.data)
    },
    clearLists(state) {
      state.activeLists = []
    },
    clearBoard(state) {
      state.activeBoard = {}
      state.activeLists = []
    },
    insertItem(state, draggable) {
      state.lists.splice(index, 0, item)
    },
    deleteItem(state, index) {
      state.lists.splice(index, 1)
    },
    login(state, user) {
      state.user = user.data.data
      state.loggedIn = true
    },
    logout(state) {
      state.user = {}
      state.loggedIn = false
      state.activeBoard = {}
      state.activeLists = []
      state.boards = []
    }
  },
  actions: {
    //when writing your auth routes (login, logout, register) be sure to use auth instead of api for the posts
    //Gets all boards given userId
    getBoards({ commit, dispatch }) {
      api('userboards')
        .then(res => {
          commit('setBoards', res.data.data)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    //Gets board by boardId
    getBoard({ commit, dispatch }, id) {
      api('boards/' + id)
        .then(res => {
          //dispatch('getLists', id)
          commit('setActiveBoard', res.data.data)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    //Creates new board
    createBoard({ commit, dispatch }, board) {
      api.post('boards/', board)
        .then(res => {
          dispatch('getBoards')
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    //Remove board
    //TODO
    removeBoard({ commit, dispatch }, id) {
      api.delete('boards/' + id)
        .then(res => {
          dispatch('getBoards')
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    //Adds list to active board
    addList({ commit, dispatch }, list) {
      var id = list.boardId
      api.post('/boards/' + id + '/lists', list).then(list => {
        dispatch('getLists', id)
      })
    },
    removeList({ commit, dispatch }, listId) {
      api.delete('lists/' + listId).then((list) => {
        dispatch('getLists', list.data.data.boardId)
      })
    },
    //Gets all lists for with active board's Id
    getLists({ commit, dispatch }, id) {
      api('/boards/' + id + '/lists').then(lists => {
        commit('setLists', lists.data.data)
      })
    },
    //Takes each list and gets task for it and pushes them to an array on the list
    getTasks({ commit, dispatch }, listId) {
      api("/lists/" + listId + "/tasks")
        .then(tasks => {
          tasks.data.listId = listId
          tasks.data.data.sort(function (a, b) {
            return a.position - b.position
          })
          commit('setTasks', tasks.data)
        })
    },
    removeTask({ commit, dispatch }, id) {
      api.delete('tasks/' + id).then((task) => {
        dispatch('getTasks', task.data.data.listId)
      })
    },
    updateTask({ commit, dispatch }, obj) {
      var updatedTask = { listId: obj.listId, position: obj.position }
      api.put('tasks/' + obj.taskId, updatedTask).then(() => {
        dispatch('getTasks', obj.listId)
        dispatch('getTasks', obj.previousListId)
      })
    },
    moveTask({ commit, dispatch }, obj) {
      console.log(obj)
      var updatedTask = { listId: obj.listId, position: obj.position }
      api.put('tasks/' + obj._id, updatedTask).then(() => {
        dispatch('getTasks', obj.listId)
        dispatch('getTasks', obj.previousListId)
      })
    },
    updateLists({ commit, dispatch }, obj) {

    },
    createComment({ commit, dispatch }, comment) {
      api.post('/tasks/' + comment.taskId + '/comments', comment).then(comment => {
        console.log(comment)
        dispatch('getComments', comment.data.data.taskId)
      })
    },
    getComments({ commit, dispatch }, taskId) {
      api('/tasks/' + taskId + '/comments').then(comments => {
        comments.data.taskId = taskId
        commit('setComments', comments.data)
      })
    },
    removeComment({ commit, dispatch }, id) {
      api.delete('comments/' + id).then((comment) => {
        dispatch('getComments', comment.data.data.taskId)
      })
    },
    createTask({ commit, dispatch }, task) {
      var listId = task.listId
      api.post('/lists/' + task.listId + '/tasks', task).then(task => {
        dispatch('getTasks', listId)
      })
    },
    insertItem({ commit, dispatch }, draggable) {
      commit(insertItem, draggable)
    },
    deleteItem({ commit, dispatch }, index) {
      commit(deleteItem, index)
    },
    clearBoard({ commit, dispatch }) {
      commit('clearBoard')
    },
    getAuth({ commit, dispatch }) {
      auth('/authenticate').then(res => {
        if (!res.data.data) {
          return router.push('/')
        }
        commit('login', res)
        router.push('/boards')
      }).catch(err => {
        router.push('/')
      })
    },
    signup({ commit, dispatch }, user) {
      auth.post('/register', user).then((user) => {
        commit('login', user)
        router.push('/boards')
      })
    },
    login({ commit, dispatch }, user) {
      auth.post('/login', user).then((user) => {
        commit('login', user)
        router.push('/boards')
      })
    },
    logout({ commit, dispatch }) {
      auth.delete('/logout').then((user) => {
        commit('logout')
        router.push('/')
      })

    },
    handleError({ commit, dispatch }, err) {
      commit('handleError', err)
    }
  }

})


export default store
