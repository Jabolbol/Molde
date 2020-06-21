import axios from 'axios';

export default {
    state: {
        token: localStorage.getItem('token'),
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
        },
        auth_error: (state) => {
            state.status = 'error';
        },
    },
    actions: {
        doLogin: ({commit}, request) => {
            return new Promise((resolve, reject) => {
                commit('auth_request');
                axios({
                    method: 'post',
                    url: 'login',
                    data: request
                }).then((resp) => {
                    const token = resp.data.data.token;
                    axios.defaults.headers.common['Authorization'] = token;
                    localStorage.setItem('token', token);
                    commit('auth_success', token, request);
                    resolve(resp);
                }).catch((err) => {
                    commit('auth_error');
                    localStorage.removeItem('token'); // if the request fails, remove any possible user token if possible
                    reject(err);
                });
            });
        },
        doRegister: ({commit}, request) => {
            return new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: 'account/client/register',
                    data: request
                }).then(() => {
                    resolve(true)
                }).catch((err) => {
                    console.log(err);
                    reject(err);
                })
            });
        },
    },
};
