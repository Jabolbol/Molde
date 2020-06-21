import axios from 'axios';

export default {
  state: {
    token: localStorage.getItem('token') || '',
    status: '',
    user: {},
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
  mutations: {
    auth_request: (state) => {
      state.status = 'loading';
    },
    auth_success: (state, token, user) => {
      state.status = 'success';
      state.token = token;
      state.user = user;
      console.log(user);
    },
    auth_error: (state) => {
      state.status = 'error';
    },
  },
  actions: {
    LOGIN: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios({ url: 'login', data: user, method: 'POST' })
          .then((resp) => {
            const token = resp.data.data.token;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = token;
            commit('auth_success', token, user);
            resolve(resp);
          })
          .catch((err) => {
            commit('auth_error');
            localStorage.removeItem('token'); // if the request fails, remove any possible user token if possible
            reject(err);
          });
      });
    },
    REGISTER: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios
          .post('account/client/register', payload, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((resp) => {
            if (resp.data.code == 200) {
              resolve(true);
            } else {
              reject(false);
            }
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
  },
};
