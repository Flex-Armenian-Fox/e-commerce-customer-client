import { createStore } from 'vuex';
import Axios from 'axios';
import router from '../router';

const axios = Axios.create({
  baseURL: 'https://dast-ecommerce.herokuapp.com',
});

export default createStore({
  state: {
    allProducts: [],
    products: [],
    product: {},
    carts: [],
    showCart: false,
    isLogin: false,
    register: false,
    isHome: false,
    routeBefore: '',
  },
  mutations: {
    SET_PRODUCTS(state, payload) {
      state.allProducts = payload;
      state.allProducts.sort((a, b) => (a['createdAt'] > b['createdAt'] ? -1 : 1));
      state.products = state.allProducts;
    },
    FILTER_PRODUCTS(state, category) {
      state.products = state.allProducts;
      if (category != 'all') {
        if (category == 'tees') {
          state.products = state.products.filter((el) => el.category == 'T-Shirt');
        } else {
          state.products = state.products.filter((el) => el.category == category);
        }
      }
    },
    SET_PRODUCT(state, payload) {
      state.product = payload;
    },
    SET_CARTS(state, payload) {
      state.carts = payload;
      state.carts.sort((a, b) => (a['createdAt'] > b['createdAt'] ? -1 : 1));
    },
    SHOW_CART(state, payload) {
      state.showCart = payload;
    },
    SET_IS_LOGIN(state, payload) {
      state.isLogin = payload;
    },
    REGISTER_SUCCESS(state, payload) {
      state.register = payload;
    },
    SET_HOME(state, payload) {
      state.isHome = payload;
    },
    SET_ROUTE(state, payload) {
      state.routeBefore = payload;
    },
    // ! belum berfungsi
    // KEYWORD_FILTER(state, keyword) {
    //   console.log(keyword);
    //   state.products = state.categorizedProducts;
    //     let filteredProducts = []
    //     state.products.forEach((el) => {
    //       let index = el.name.toLowerCase().indexOf(keyword)
    //       console.log(index);
    //       if(index != -1) filteredProducts.push(state.products[index])
    //     });
    //     if(filteredProducts.length > 0) state.products = filteredProducts
    // },
  },
  actions: {
    fetchData(context) {
      axios({
        method: 'GET',
        url: '/products',
        headers: {
          access_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjI1ODQ4Mzc0fQ.g2kW9X__C11GqaBGhMKBGr_OeWeBmHEFIItl0OdfjMM',
        },
      })
        .then((result) => {
          console.log(result.data);
          context.commit('SET_PRODUCTS', result.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getProduct(context, id) {
      axios({
        method: 'GET',
        url: '/products/' + id,
        headers: {
          access_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjI1ODQ4Mzc0fQ.g2kW9X__C11GqaBGhMKBGr_OeWeBmHEFIItl0OdfjMM',
        },
      })
        .then((result) => {
          console.log(result);
          context.commit('SET_PRODUCT', result.data.data);
          router.push(`/shop/product/${id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addCart(context, id) {
      axios({
        method: 'POST',
        url: '/carts/' + id,
        headers: {
          access_token: localStorage.access_token,
        },
        data: {
          amount: 1,
        },
      })
        .then((result) => {
          console.log(result);
          // if (result.data.message == 'created') {
          // }
          // context.dispatch('fetchData');
          // context.commit('SET_LOADING', 'done');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchCart(context) {
      axios({
        method: 'GET',
        url: '/carts',
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((result) => {
          console.log(result);
          context.commit('SET_CARTS', result.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editCart(context, payload) {
      axios({
        method: 'PUT',
        url: '/carts/' + payload.id,
        headers: {
          access_token: localStorage.access_token,
        },
        data: {
          amount: payload.amount,
        },
      })
        .then((result) => {
          console.log(result);
          context.dispatch('fetchCart');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteCart(context, id) {
      console.log(context);
      axios({
        method: 'DELETE',
        url: '/carts/' + id,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((result) => {
          console.log(result);
          context.dispatch('fetchCart');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    login(context, payload) {
      axios({
        method: 'POST',
        url: '/login',
        data: {
          email: payload.email,
          password: payload.password,
        },
      })
        .then((result) => {
          console.log(result);
          context.commit('SET_IS_LOGIN', true);
          localStorage.setItem('access_token', result.data.access_token);
          router.push(context.state.routeBefore);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    register(context, payload) {
      axios({
        method: 'POST',
        url: '/register',
        data: {
          email: payload.email,
          password: payload.password,
        },
      })
        .then((result) => {
          console.log(result);
          context.commit('REGISTER_SUCCESS', true);
          router.push('/login');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  getters: {
    url(state) {
      let image_urls = 0;
      for (let i = 0; i < 5; i++) {
        if (state.product[`image_url${i + 1}`]) image_urls++;
      }
      return image_urls;
    },
  },
  modules: {},
});
