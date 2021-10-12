/* eslint-disable no-shadow */
import server from '../../utils/server_config';
import router from '../../router/index';

const state = () => ({
  isLogin: localStorage.getItem('access_token'),
  formLogin: {
    email: '',
    password: '',
  },
  formRegister: {
    email: '',
    password: '',
  },
});
const mutations = {
  SET_IS_LOGIN(state, data) {
    state.isLogin = data;
  },
  SET_FORM_LOGIN(state, data) {
    state.formLogin.email = data.email;
    state.formLogin.password = data.password;
  },
  SET_FORM_REGISTER(state, data) {
    state.formRegister.email = data.email;
    state.formRegister.password = data.password;
  },
};
const actions = {
  login(context, payload) {
    server({
      method: 'POST',
      url: '/users/login',
      data: {
        email: payload.email,
        password: payload.password,
      },
    }).then(({ data: response }) => {
      console.log('sukses login', response);
      localStorage.setItem('access_token', response.data.access_token);
      context.commit('SET_IS_LOGIN', true);
      context.commit('SET_FORM_LOGIN', { email: '', password: '' });
      router.push('/');
    }).catch((err) => {
      console.log('error login', err);
    });
  },
  register(context, payload) {
    server({
      method: 'POST',
      url: '/users/register',
      data: {
        email: payload.email,
        password: payload.password,
      },
    }).then(({ data: response }) => {
      console.log('sukses login', response);
      context.commit('SET_FORM_REGISTER', { email: '', password: '' });
      router.push('/login');
    }).catch((err) => {
      console.log('error login', err);
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
