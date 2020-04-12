import axios from 'axios'

export default {
    state: {
        
    },
    getters: {
        
    },
    mutations: {
        
    },
    actions: {
        LOGIN: ({commit}, payload) => {
          return  new Promise((resolve, reject) => {
            axios.post('login', payload)
                .then(({data, status}) => { 
                    if(data.code == 200) {
                        resolve(true)
                    }else{
                        reject(false)
                    }
                })
                .catch (error => {
                    reject(error);
                })
          });
        },
        REGISTER: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios.post('account/client/register', payload, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(({data, status}) => {
                    if(data.code == 200) {
                        resolve(true);
                    }else{
                        reject(false)
                    }
                })
                .catch (error => {
                    console.log(error)
                    reject(error);
                })
            });  
        } 
    }
    
}
