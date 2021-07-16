import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from '../router'

const axios = Axios.create({
    baseURL: 'https://ecommerce-cms-kd.herokuapp.com'
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    drawer: false,
    isError: false,
    errorMessage: '',
    products: [],
    currentUser: '',
    currentCart: [],
    currentGrandTotal: 0,
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
    },
    SET_CURRENT_USER (state, payload) {
        state.currentUser = payload
    },
    SET_CART_CONTENT (state, payload) {
        state.currentCart = payload
    },
    COUNT_GRAND_TOTAL (state, payload) {
        console.log(payload, ' <== payload dari COUNT GRAND TOTAL')
        let result = 0
        if (payload.length === 0) {
            state.currentGrandTotal = 0
        } else {
            for (let i = 0; i < payload.length; i++) {
                let data = payload[i]
                let subTotal = data.Product.price * data.quantity
                result += subTotal
            }
            state.currentGrandTotal = result
        }
    },
    RESET_GRAND_TOTAL (state, payload) {
        state.currentGrandTotal = payload
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
        axios({
            method: 'POST',
            url: '/users/register',
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
    userLogin ({ commit, dispatch }, input) {
        axios({
            method: 'POST',
            url: '/users/login',
            data: input
        })
        .then(response => {
            localStorage.setItem('accesstoken', response.data.accesstoken)
            localStorage.setItem('currentEmail', input.email)
            commit('LOGIN_STATUS', true)
            commit('SET_CURRENT_USER', input.email)
            router.push({ name: 'Home' })
            dispatch('fetchCart')
        })
        .catch(err => {
            const errorMsg = err.response.data.error.message
            commit('SET_ERROR_STATUS', true)
            commit('SET_ERROR_MESSAGE', errorMsg)
        })
    },
    userLogout ({ commit }) {
        localStorage.clear()
        commit('RESET_GRAND_TOTAL', 0)
        commit('SET_CART_CONTENT', [])
        commit('SET_CURRENT_USER', '')
        commit('LOGIN_STATUS', false)
    },
    fetchProducts ({ commit }) {
        axios({
            method: 'GET',
            url: '/products/'
        })
        .then(response => {
            // console.log(response.data.products, ' <== fetchProducts THEN')
            commit('SET_PRODUCTS', response.data.products)
        })
        .catch(err => {
            console.log(err, ' <== fetchProducts ERROR')
        })
    },
    fetchCart ({ commit }) {
        axios({
            method: 'GET',
            url: '/cart',
            headers: {accesstoken: localStorage.getItem('accesstoken')}
        })
        .then(response => {
            console.log(response.data.cart, ' dari GET CART - LOGIN')
            commit('SET_CART_CONTENT', response.data.cart)
            commit('COUNT_GRAND_TOTAL', response.data.cart)
        })
        .catch(err => {
            console.log(err)
        })
    },
    buyProduct ({ commit, dispatch }, productId) {
        if (!localStorage.getItem('accesstoken')) {
            commit('SET_ERROR_STATUS', true)
            commit('SET_ERROR_MESSAGE', 'You must login first to shop')
            router.push({ name: 'LoginPage' })
        } else {
            axios({
                method: 'POST',
                url: '/cart/' + productId,
                headers: {accesstoken: localStorage.getItem('accesstoken')},
                data: {quantity: 1}
            })
            .then(response => {
                console.log(response.data, ' <== buyProduct THEN')
                dispatch('fetchCart')
            })
            .catch(err => {
                console.log(err, ' <== buyProduct ERROR')
            })
        }
    },
    deleteCart ({ commit, dispatch }, cartId) {
        axios({
            method: 'DELETE',
            url: '/cart/' + cartId,
            headers: {accesstoken: localStorage.getItem('accesstoken')}
        })
        .then(response => {
            console.log(response.data, ' <== deleteCart SUCCESS')
            dispatch('fetchCart')
        })
        .catch(err => {
            console.log(err, ' <== deleteCart ERROR')
        })
    },
    checkAuth ({ commit }, boolean) {
        commit('LOGIN_STATUS', boolean)
    },
    updateCart ({ commit, dispatch }, payload) {
        axios({
            method: 'PATCH',
            url: '/cart/' + payload.cartId,
            headers: {accesstoken: localStorage.getItem('accesstoken')},
            data: {newQuantity: payload.newQuantity}
        })
        .then(response => {
            console.log(response.data, ' <== updateCart SUCCESS')
            dispatch('fetchCart')
        })
        .catch(err => {
            console.log(err)
        })
    }
  }
})