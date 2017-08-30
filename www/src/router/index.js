import Vue from 'vue'
import Router from 'vue-router'
import Boards from 'components/Boards'
import Board from 'components/Board'
import Login from 'components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Login',
    //   component: Login
    // },
     {
      path: '/boards',
      name: 'Boards',
      component: Boards
    }, {
      path: '/boards/:id',
      name: 'Board',
      component: Board
    }
  ]
})
