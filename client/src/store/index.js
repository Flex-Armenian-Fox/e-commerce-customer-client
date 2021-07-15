import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    drawer: false,
    isError: false,
    errorMessage: '',
    products: [],
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
    },
    SET_PRODUCTS (state, payload) {
        state.products = payload
    },
    SET_DRAWER_STATUS (state, payload) {
        state.drawer = payload
    }
  },
  actions: {
    toggleCart ({ commit }, nextStatus) {
        commit('SET_DRAWER_STATUS', nextStatus)
    },
    toRegisterPage ({ commit }) {
        commit('SET_ERROR_STATUS', false)
        commit('SET_ERROR_MESSAGE', '')
        router.push({ name: 'RegisterPage' })
    },
    toLoginPage ({ commit }) {
        commit('SET_ERROR_STATUS', false)
        commit('SET_ERROR_MESSAGE', '')
        router.push({ name: 'LoginPage' })
    },
    toHomePage ({ commit }) {
        commit('SET_ERROR_STATUS', false)
        commit('SET_ERROR_MESSAGE', '')
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
    fetchProducts ({ commit }) {
        Axios({
            method: 'GET',
            url: 'http://localhost:3000/products/'
        })
        .then(response => {
            console.log(response.data.products, ' <== fetchProducts THEN')
            commit('SET_PRODUCTS', response.data.products)
        })
        .catch(err => {
            console.log(err, ' <== fetchProducts ERROR')
        })
    },
    buyProduct ({ commit }, productId) {
        if (!localStorage.getItem('accesstoken')) {
            commit('SET_ERROR_STATUS', true)
            commit('SET_ERROR_MESSAGE', 'You must login first to shop')
            router.push({ name: 'LoginPage' })
        } else {

        }
    },
    checkAuth ({ commit }, boolean) {
        commit('LOGIN_STATUS', boolean)
    }
  }
})