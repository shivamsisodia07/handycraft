import config from '../config'
import TokenService from './token-service'

const AuthApiService = {
  postLogin(credentials) {

    if (credentials.role == 0) {
      return fetch(`${config.FARMER_API_ENDPOINT}/login`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(credentials),


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
    else if (credentials.role == 1) {
      return fetch(`${config.CONSUMER_API_ENDPOINT}/login`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(credentials),


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
  },
  verifyOtp(data) {
    if (data.role == 0) {
      return fetch(`${config.FARMER_API_ENDPOINT}/otp-verify`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then(res =>
        (!res.ok) ?
          res.json().then(e => Promise.reject(e)) :
          res.json()).catch(err => {
            console.log(err);
          })
    }
    else if (data.role == 1) {
      return fetch(`${config.CONSUMER_API_ENDPOINT}/otp-verify`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then(res =>

        (!res.ok) ?
          res.json().then(e => Promise.reject(e)) :
          res.json()
      ).catch(err => {
        console.log(err);
      })
    }
  },
  getProfile(role) {

    if (role == "farmer") {
      return fetch(`${config.FARMER_API_ENDPOINT}/edit`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          "authtoken": TokenService.getAuthToken(),

        },
      }).then(async (res) => {
        if (res.ok) {
          return await res.json();
        }
      }).catch(err => {
        console.log(err);
      })
    }
    else if (role == "consumer") {
      return fetch(`${config.CONSUMER_API_ENDPOINT}/edit`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          "authtoken": TokenService.getAuthToken(),
        },
      }).then(async (res) => {
        if (res.ok) {
          return await res.json();
        }
      }).catch(err => {
        console.log(err);
      })
    }
  },

  EditProfile(data) {
    if (data.role == 0) {
      return fetch(`${config.FARMER_API_ENDPOINT}/edit`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          "authtoken": TokenService.getAuthToken(),
        },
        body: JSON.stringify(data),


      })
        .then(async (res) => {
          if (res.ok) {
            return await res.json();
          }
        }
        )
        .catch(err => {
          console.log('error:', err)
        })
    }
    else if (data.role == 1) {
      return fetch(`${config.CONSUMER_API_ENDPOINT}/login`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          "authtoken": TokenService.getAuthToken(),
        },
        body: JSON.stringify(data),


      })
        .then(async (res) => {
          if (res.ok) {
            return await res.json();
          }
        }
        )
        .catch(err => {
          console.log('error:', err)
        })
    }
  },

  FetchInvFarmer() {
    return fetch(`${config.INVENTORY_API_ENDPOINT}/`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        "authtoken": TokenService.getAuthToken(),
      },
    }).then(async (res) => {
      if (res.ok) {
        return await res.json();
      }
    }).catch((err) => {
      console.log(err);
    })
  },

  FetchInvItem(id) {
    return fetch(`${config.INVENTORY_API_ENDPOINT}/edit/${id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        "authtoken": TokenService.getAuthToken(),
      }
    }).then(async (res) => {
      if (res.ok) {
        return await res.json();
      }
    }).catch((err) => {
      console.log(err);
    })
  },

  UpdateInvItem(itemId,data) {
    return fetch(`${config.INVENTORY_API_ENDPOINT}/edit/${itemId}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        "authtoken": TokenService.getAuthToken(),
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      if (res.ok) {
        return await res.json();
      }
    }).catch((err) => {
      console.log(err);
    })
  }




}

export default AuthApiService