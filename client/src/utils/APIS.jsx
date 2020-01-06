import axios from 'axios';

let url;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    url = process.env.REACT_APP_DEV_SERVER
  } else {
    url = process.env.REACT_APP_PROD_SERVER
  }


export default {
    register: (username, email, password) => {
      return axios.post(`${url}/register`, {
          username,
          email,
          password
      })
    .then(response => response.data)
    },
    login: (email, password) => {
        return axios.post(`${url}/login`, {
            email,
            password
        })
        .then(response => response.data)
    }
  }