import axios from 'axios'

export default {
    state: {
        // profileDetail: {},
        // isAuthError: false
    },
    getters: {
        // profileDetail: state => {
        //     return state.profileDetail
        // },
        // setIsAuthError: state => {
        //     return state.isAuthError
        // },
        // authMessageError: state => {
        //     return state.authMessageError
        // }
    },
    mutations: {
        // setProfileDetail: (state, payload) => {
        //     state.profileDetail = payload
        // },
        // setIsAuthError: (state, payload) => {
        //     state.isAuthError = payload
        // },
        // setAuthMessageError: (state, payload) => {
        //     state.authMessageError = payload
        // }
    },
    actions: {
        LOGIN: ({commit}, payload) => {
          return  new Promise((resolve, reject) => {
            axios
            axios.post('login', payload)
            .then(({data, status}) => { 
                if(status === 200) {
                    resolve(true)

                }
            })
            .catch (error => {
                reject(error);
            })
          });

        }
    //     getProfileDetail ({commit}, userId) {
    //         Axios
    //             .get(URL_API + '/profile/' + userId) 
    //                 .then(response => {
    //                     console.log(response)
    //                 }).catch((e) => {
    //                     console.log(e)
    //                 })
    //     }
    // },
    // retrieveToken ({commit}, user) {
    //     Axios
    //     .post(URL_API + 'login', user)
    //     .then(response => {
    //         console.log(response)
    //         if(response.data.status === true) {
    //             document.cookie = 'token=' + response.data.auth.token
    //             document.cookie = 'username=' + response.data.auth.username
    //             document.cookie = 'role=' + response.data.auth.role
    //             document.cookie = 'message=' + response.data.auth.message
    //             document.cookie = 'status=' + response.data.status
    //             commit('setAuthMessageError', '')
    //         } else {
    //             commit('setAuthMessageError', response.data.message)
    //         }
    //     }).catch((e) => {
    //         console.log(e)
    //     })
    // },
    // doRegister ({commit}, data) {
    //     console.log(data)
    //     const formData = new FormData()
    //     formData.append('username', data.username)
    //     formData.append('password', data.password)
    //     formData.append('firstname', data.firstname)
    //     formData.append('lastname', data.lastname)
    //     formData.append('email', data.email)
    //     formData.append('number', data.number)

    //     Axios
    //     .post(URL_API + 'register', formData)
    //     .then(response => {
    //         console.log(response.data.message)
    //         if(response.data.status === false) {
    //             commit('setAuthError', true)
    //             commit('setAuthMessageError', response.data.message)
    //         } else {
    //             commit('setAuthMessageError', '')
    //         }
    //     }).catch((e) => {
    //         console.log(e)
    //     })
    }
    
}
