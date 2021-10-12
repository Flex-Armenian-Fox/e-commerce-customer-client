/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
import Vue from 'vue';
import Vuesax from 'vuesax';
import server from '../../utils/server_config';
import 'vuesax/dist/vuesax.css';

Vue.use(Vuesax, {});

const state = () => ({
  categories: [],
  products: [],
  currentCategoryId: null,
  product: null,
  carts: [],
  status: {
    msg: '',
    title: '',
  },
});
const mutations = {
  SET_CATEGORIES(state, value) {
    state.categories = value;
  },
  SET_PRODUCTS(state, value) {
    state.products = value;
  },
  SET_CURRENT_CATEGORY_ID(state, value) {
    state.currentCategoryId = value;
  },
  SET_PRODUCT(state, value) {
    state.product = value;
  },
  SET_CARTS(state, value) {
    state.carts = value;
  },
  SET_STATUS(state, value) {
    state.message = value;
  },
};
const actions = {
  fetchCategories(context) {
    server({
      method: 'GET',
      url: '/categories',
    }).then(({ data: response }) => {
      context.commit('SET_CATEGORIES', response.data);
      context.commit('SET_CURRENT_CATEGORY_ID', response.data[0].category_id);
    }).catch((err) => {
      console.log('error fetchCategories', err);
    });
  },

  fetchProducts(context) {
    server({
      method: 'GET',
      url: '/products',
    }).then(({ data: response }) => {
      context.commit('SET_PRODUCTS', response.data);
    }).catch((err) => {
      console.log('error fetchProducts', err);
    });
  },

  fetchProductById(context, payload) {
    server({
      method: 'GET',
      url: `/products/${payload.id}`,
    }).then(({ data: response }) => {
      context.commit('SET_PRODUCT', response.data);
    }).catch((err) => {
      console.log('error fetchProductById', err);
    });
  },

  addToCart(context, payload) {
    server({
      method: 'POST',
      url: '/carts',
      data: {
        product_id: payload.productId,
        total_quantity: 1,
      },
      headers: {
        access_token: localStorage.getItem('access_token'),
      },
    }).then(() => {
      context.dispatch('fetchCarts');
    }).catch((err) => {
      console.log('error addToCart', err);
    });
  },

  fetchCarts(context) {
    server({
      method: 'GET',
      url: '/carts',
      headers: {
        access_token: localStorage.getItem('access_token'),
      },
    }).then(({ data: response }) => {
      context.commit('SET_CARTS', response);
    }).catch((err) => {
      console.log('error fetchCarts', err);
    });
  },

  patchCart(_, payload) {
    return server({
      method: 'PATCH',
      url: `/carts/${payload.cartId}`,
      data: {
        total_quantity: payload.total_quantity,
      },
      headers: {
        access_token: localStorage.getItem('access_token'),
      },
    }).then(() => {
      this._vm.$vs.notify({
        title: 'Success',
        text: 'Update Success',
        color: 'success',
        position: 'top-right',
      });
    }).catch((err) => {
      console.log('error patchCart', err);
      this._vm.$vs.notify({
        title: 'Failed',
        text: 'Update Failed',
        color: 'danger',
        position: 'top-right',
      });
    });
  },

  deleteCart(context, payload) {
    return server({
      method: 'DELETE',
      url: `/carts/${payload.id}`,
      headers: {
        access_token: localStorage.getItem('access_token'),
      },
    }).then(() => {
      this._vm.$vs.notify({
        title: 'Deleted',
        text: 'Cart Deleted',
        color: 'danger',
        position: 'top-right',
      });
      context.dispatch('fetchCarts');
    }).catch((err) => {
      console.log('error deleteCart', err);
      this._vm.$vs.notify({
        title: 'Failed',
        text: 'Delete Failed',
        color: 'danger',
        position: 'top-right',
      });
    });
  },
};

const getters = {
  filterProductByCat: (state) => {
    if (state.currentCategoryId) {
      return state.products.filter((item) => item.category_id === state.currentCategoryId);
    }
    return state.products;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
