import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    isError: false,
    errorMessage: '',
    slides: [
      'slide 1',
      'slide 2',
      'slide 3',
      'slide 4',
    ]
  },
  mutations: {
    LOGIN_STATUS (state, payload) {
        state.isLoggedIn = payload
    },
    SET_ERROR_STATUS (state, payload) {
        state.isError = payload
    },
    SET_ERROR_MESSAGE (state, payload) {
        state.errorMessage = payload
    }
  },
  actions: {
    toRegisterPage () {
        router.push({ name: 'RegisterPage' })
    },
    toLoginPage () {
        router.push({ name: 'LoginPage' })
    },
    toHomePage () {
        router.push({ name: 'Home'})
    },
    userRegister ({ commit }, input) {
        Axios({
            method: 'POST',
            url: 'http://localhost:3000/users/register',
            data: input
        })
        .then(response => {
            commit('SET_ERROR_STATUS', false)
            commit('SET_ERROR_MESSAGE', '')
            router.push({ name: 'LoginPage' })
        })
        .catch(err => {
            const errorMsg = err.response.data.error.message
            commit('SET_ERROR_STATUS', true)
            commit('SET_ERROR_MESSAGE', errorMsg)
        })
    },
    userLogin ({ commit }, input) {
        Axios({
            method: 'POST',
            url: 'http://localhost:3000/users/login',
            data: input
        })
        .then(response => {
            localStorage.setItem('accesstoken', response.data.accesstoken)
            commit('LOGIN_STATUS', true)
            router.push({ name: 'Home' })
        })
        .catch(err => {
            console.log(err)
        })
    },
    userLogout ({ commit }) {
        localStorage.clear()
        commit('LOGIN_STATUS', false)
    },
    checkAuth ({ commit }, boolean) {
        commit('LOGIN_STATUS', boolean)
    }
  }
})