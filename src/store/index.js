import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import Swal from 'sweetalert2'

Vue.use(Vuex)

axios.defaults.baseURL = 'https://e-carrello.herokuapp.com'
// axios.defaults.baseURL = 'http://localhost:3000'

export default new Vuex.Store({
  state: {
    isLogin: false,
    isCart: false,
    activeCategory: null,
    products: [],
    categories: [],
    carts: []
  },
  mutations: {
    SET_ISLOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_ISCART (state, payload) {
      state.isCart = payload
    },
    SET_PRODUCTS (state, payload) {
      payload.forEach(item => {
        item.qty = 1
      })
      state.products = payload
    },
    SET_CATEGORIES (state, payload) {
      state.categories = payload
    },
    SET_CARTS (state, payload) {
      state.carts = payload
    },
    SET_ACTIVECATEGORY (state, payload) {
      state.activeCategory = payload
    }
  },
  actions: {
    login (context, payload) {
      console.log('masuk axios')
      axios({
        method: 'POST',
        url: '/users/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      }).then((result) => {
        localStorage.setItem('access_token', result.data.access_token)
        context.commit('SET_ISLOGIN', true)
        router.push({ name: 'Home' })
      }).catch(error => {
        Swal.fire({
          type: 'warning',
          title: error.response.data.message,
          message: error.response.data.message,
          showConfirmButton: true,
          timer: 1500
        })
      })
    },
    register (context, payload) {
      console.log('masuk axios')
      axios({
        method: 'POST',
        url: '/users/register',
        data: {
          email: payload.email,
          password: payload.password,
          address: payload.address,
          phone: payload.phone
        }
      }).then((result) => {
        localStorage.setItem('access_token', result.data.access_token)
        context.commit('SET_ISLOGIN', true)
        router.push({ name: 'Home' })
      }).catch(error => {
        Swal.fire({
          type: 'warning',
          title: error.response.data.message,
          message: error.response.data.message,
          showConfirmButton: true,
          timer: 1500
        })
      })
    },
    logout (context, payload) {
      localStorage.clear()
      context.commit('SET_ISLOGIN', false)
      router.push('/')
    },
    getProducts (context, payload) {
      axios({
        method: 'GET',
        url: '/products'
      }).then((result) => {
        console.log(result.data)
        context.commit('SET_PRODUCTS', result.data)
      }).catch(error => {
        Swal.fire({
          type: 'warning',
          title: error.response.data.message,
          message: error.response.data.message,
          showConfirmButton: true,
          timer: 1500
        })
      })
    },
    getCategories (context, payload) {
      axios({
        method: 'GET',
        url: '/categories'
      }).then((result) => {
        context.commit('SET_CATEGORIES', result.data)
      }).catch(error => {
        Swal.fire({
          type: 'warning',
          title: error.response.data.message,
          message: error.response.data.message,
          showConfirmButton: true,
          timer: 1500
        })
      })
    },
    getCarts (context, payload) {
      axios({
        method: 'GET',
        url: '/carts',
        headers: {
          access_token: localStorage.access_token
        }
      }).then((result) => {
        console.log('Data Cart', result.data)
        context.commit('SET_CARTS', result.data)
      }).catch(error => {
        Swal.fire({
          type: 'warning',
          title: error.response.data.message,
          message: error.response.data.message,
          showConfirmButton: true,
          timer: 1500
        })
      })
    },
    addCart (context, payload) {
      console.log(payload)
      if (payload.qty <= 0) {
        Swal.fire({
          type: 'warning',
          title: 'Qty Tidak Valid',
          message: 'Qty Order Tidak boleh lebih kecil dari nol',
          showConfirmButton: true,
          timer: 1500
        })
      } else {
        axios({
          method: 'POST',
          url: '/carts',
          headers: {
            access_token: localStorage.access_token
          },
          data: payload
        }).then((result) => {
          Swal.fire({
            type: 'info',
            title: 'Thank You',
            message: 'Add to Cart Successfull',
            showConfirmButton: true,
            timer: 1500
          })
        }).catch(error => {
          Swal.fire({
            type: 'warning',
            title: error.response.data.message,
            message: error.response.data.message,
            showConfirmButton: true,
            timer: 1500
          })
        })
      }
    },
    deleteCart (context, payload) {
      axios({
        method: 'DELETE',
        url: '/carts/' + payload.id,
        headers: {
          access_token: localStorage.access_token
        }
      }).then((result) => {
        Swal.fire({
          type: 'info',
          title: 'Thank You',
          message: 'Cart Deleted Successfull',
          showConfirmButton: true,
          timer: 1500
        })
        context.dispatch('getCart')
      }).catch(error => {
        Swal.fire({
          type: 'warning',
          title: error.response.data.message,
          message: error.response.data.message,
          showConfirmButton: true,
          timer: 1500
        })
      })
    },
    updateQty (context, payload) {
      console.log('PAYLOAD', payload)
      axios({
        method: 'PATCH',
        url: '/carts/' + payload.id,
        headers: {
          access_token: localStorage.access_token
        },
        data: payload
      }).then((result) => {
      }).catch(error => {
        Swal.fire({
          type: 'warning',
          title: error.response.data.message,
          message: error.response.data.message,
          showConfirmButton: true,
          timer: 1500
        })
      })
    }
  },
  getters: {
    filteredProducts: state => {
      if (state.activeCategory) {
        return state.products.filter(item => item.categoryid === state.activeCategory)
      } else {
        return state.products
      }
    }
  },
  modules: {
  }
})
