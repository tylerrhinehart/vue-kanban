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
    // setLists(state, lists) {
    //   state.activeLists = lists
    // },
    setTasks(state, list) {
      state.activeLists.push(list)
    },
    clearLists(state){
      state.activeLists = []
    },
    clearBoard(state) {
      state.activeBoard = {}
      state.activeLists = []
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
          dispatch('getLists', id)
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
    removeBoard({ commit, dispatch }, board) {
      api.delete('boards/' + board._id)
        .then(res => {
          this.getBoards()
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
    //Gets all lists for with active board's Id
    getLists({ commit, dispatch }, id) {
      api('/boards/' + id + '/lists').then((lists) => {
        dispatch('getTasks', lists)
        // commit('setLists', lists).then(lists => {
        // lists.forEach(list => {
        //   debugger
        //   var listId = list._id
        //   console.log(list)
        //   dispatch('getTasks', listId)
        // })
        // })
      })
    },
    //Takes each list and gets task for it and pushes them to an array on the list
    getTasks({ commit, dispatch }, lists) {
      commit('clearLists')
      lists.data.data.forEach((list) => {
        var id = list._id
        api('/lists/' + id + '/tasks').then((tasks) => {
          list.task = tasks
          commit('setTasks', list)
          //   .then(tasks => {
          //     tasks.forEach(task => {
          //       var taskId = task._id
          //       console.log(task)
          //       dispatch('getComments', taskId)
          //     })
          //   })
        })
      })
    },
    createTask({commit,dispatch}, task){
      console.log(task)
      var boardId = task.boardId
      api.post('/lists/' + task.listId + '/tasks', task).then(task=>{
        dispatch('getLists', boardId)
      })
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
