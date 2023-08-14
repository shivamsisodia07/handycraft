import config from '../config'
import TokenService from './token-service'
const AuthApiService = {
  
  editUser(role, data) {
    let link = `${config.CONSUMER_API_ENDPOINT}/edit`;
    if (role == 1) {
      link = `${config.CRAFTER_API_ENDPOINT}/edit`;
    }
    return fetch(link, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authtoken': TokenService.getAuthToken(),
      },
      body: JSON.stringify(data),

    })
      .then(res =>
        (!res.ok) ?
          res.json().then(e => Promise.reject(e)) :
          res.json()
      )
      .catch(err => {
        console.log('error:', err)
      })

  },
  fetchUser(role) {
    let link = `${config.CONSUMER_API_ENDPOINT}/edit`;
    if (role == 1) {
      link = `${config.CRAFTER_API_ENDPOINT}/edit`;
    }
    return fetch(link, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authtoken': TokenService.getAuthToken(),
      },

    })
      .then(res =>
        (!res.ok) ?
          res.json().then(e => Promise.reject(e)) :
          res.json()
      )
      .catch(err => {
        console.log('error:', err)
      })
  }

}

export default AuthApiService