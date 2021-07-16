import Vue from 'vue';
import Vuex from 'vuex';
import userModule from './modules/user.store';
import productModule from './modules/product.store';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    carts: [],
    isLoginModal: false,
  },
  mutations: {
    SET_IS_LOGIN_MODAL(state, data) {
      state.isLoginModal = data;
    },
    SET_CARTS(state, data) {
      state.carts = data;
    },
  },
  actions: {
  },
  modules: {
    userModule,
    productModule,
  },
});
