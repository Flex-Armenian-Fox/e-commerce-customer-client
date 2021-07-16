import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import Axios from 'axios'
import Swal from 'sweetalert2'

const axios = Axios.create({
    baseURL: 'http://localhost:3000/'
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    products: [],
    tags: [],
    carts: []
  },
  mutations: {
    CHECK_LOGIN(state){
      if(localStorage.access_token) state.isLoggedIn=true
      else state.isLoggedIn=false
    },
    SET_PRODUCTS(state, payload){
      state.products = payload
    },
    SET_TAGS(state, payload) {state.tags = payload},
    SET_CARTS(state, payload) {state.carts = payload}
  },
  actions: {
    login(context, payload){
      axios.post('/login', payload)
        .then(res => {
          localStorage.access_token = res.data.access_token
          context.commit('CHECK_LOGIN')
          router.push('/')
        })
        .catch(err => {
          console.error(err); 
        })
    },
    register(context, payload){
      axios.post('/register', payload)
        .then(() => {
          context.dispatch('login', payload)
        })
        .catch(err => {
          console.error(err); 
        })
    },
    fetchData(context){
      console.log('fetching data')
      axios.get('/products', {headers: localStorage.access_token? {access_token: localStorage.access_token}: null})
        .then(res => {
          context.commit('SET_PRODUCTS', res.data)
          return axios.get('/tags', {headers: {access_token: localStorage.access_token}})
        })
        .then(res => {
          context.commit('SET_TAGS', res.data)
        })
    },
    addCart(context, payload){
      axios.post('/cart/'+ payload.id, {toBuy: payload.toBuy}, {headers: {access_token: localStorage.access_token}})
        .then(() =>{
          context.dispatch('fetchData')
        })
        .catch(err => console.log(err))
    },
    buyItem(context, payload){
      Swal.fire({
          title: 'Buy Item?',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Buy!'
      })
      .then((result) => {
          if(result.value){
            return axios.post('/buy/'+ payload.id, {toBuy: payload.toBuy}, {headers: {access_token: localStorage.access_token}})
          }
      })
      .then(() =>{
        context.dispatch('getCart')
      })
      .catch(err => console.log(err))
    },
    getCart(context){
      axios.get('/cart', {headers: {access_token: localStorage.access_token}})
        .then(result =>{
          context.commit('SET_CARTS', result.data)
        })
        .catch(err => console.log(err))
    },
    delCart(context, payload){
      Swal.fire({
        title: 'Delete cart?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete!'
      })
      .then((result) => {
          if(result.value){
            return axios.delete('/cart/' + payload, {headers: {access_token: localStorage.access_token}})
          }
      })
      .then(() =>{
        context.dispatch('getCart')
      })
      .catch(err => console.log(err))
      }
  },
  getters: {
    tagFilter: (state) => (tag) => {
      console.log(tag)
      return state.products.filter(product => product.Tags.some(el => el.name == tag))
    }
  },
  modules: {
  }
})
