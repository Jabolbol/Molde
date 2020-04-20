import axios from 'axios'

export default {
    state : {},
    getters: {},
    mutations:{},
    actions: {
        Product: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios.post('product', payload)
                    .then(({data, status}) => {
                        if (data.code == 200) {
                            resolve(true)
                        } else {
                            reject(false)
                        }
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
        }
    }
}
