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
      console.log(activeBoard)
    },
    setLists(state, lists) {
      state.activeLists = lists
    },
    setTasks(state, obj) {
      var list = state.activeLists
      list.tasks = obj.tasks
    },
    login(state, user) {
      state.user = user.data.data
      state.loggedIn = true
    },
    logout(state) {
      state.user = {}
      state.loggedIn = false
    }
  },
  actions: {
    //when writing your auth routes (login, logout, register) be sure to use auth instead of api for the posts

    getBoards({ commit, dispatch }) {
      api('userboards')
        .then(res => {
          commit('setBoards', res.data.data)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
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
    createBoard({ commit, dispatch }, board) {
      api.post('boards/', board)
        .then(res => {
          dispatch('getBoards')
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    removeBoard({ commit, dispatch }, board) {
      api.delete('boards/' + board._id)
        .then(res => {
          this.getBoards()
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    getLists({ commit, dispatch }, id) {
      api('/boards/' + id + '/lists').then((lists) => {
        commit('setLists', lists).then(lists => {
          lists.forEach(list => {
            var listId = list._id
            console.log(list)
            dispatch('getTasks', listId)
          })
        })
      })
    },
    getTasks({ commit, dispatch }, id) {
      api('/lists/' + id + '/tasks').then((tasks) => {
        commit('setTasks', { tasks: tasks, listId: id }).then(tasks => {
          tasks.forEach(task => {
            var taskId = task._id
            console.log(task)
            dispatch('getComments', taskId)
          })
        })
      })
    },
    getAuth({ commit, dispatch }) {
      auth('/authenticate').then(res => {
        if (!res.data.data) {
          return router.push('/')
        }
        commit('login', res)
        // state.user = res.data.data
        // router.push('/boards')
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
