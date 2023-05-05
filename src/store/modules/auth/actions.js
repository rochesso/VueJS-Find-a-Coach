import router from '../../../router/index.js'

const signupURL = import.meta.env.VITE_SIGNUP
const loginURL = import.meta.env.VITE_LOGIN

let timer
export default {
  async auth(context, payload) {
    const mode = payload.mode
    let url = ''
    if (mode === 'login') {
      url = loginURL
    } else {
      url = signupURL
    }
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    })

    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.error.message || 'Failed to signup/login!')
      throw error
    }

    const expiresIn = +responseData.expiresIn * 1000
    const expirationDate = new Date().getTime() + expiresIn

    localStorage.setItem('token', responseData.idToken)
    localStorage.setItem('userId', responseData.localId)
    localStorage.setItem('tokenExpiration', expirationDate)

    timer = setTimeout(function () {
      context.dispatch('logout')
    }, expiresIn)

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: expirationDate
    })
  },
  tryLogin(context) {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const tokenExpiration = localStorage.getItem('tokenExpiration')

    const expiresIn = +tokenExpiration - new Date().getTime()

    if (expiresIn < 30 * 60 * 1000) {
      return
    }

    timer = setTimeout(function () {
      context.dispatch('logout')
    }, expiresIn)

    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
        tokenExpiration: tokenExpiration
      })
    }
  },
  logout(context) {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('tokenExpiration')

    clearTimeout(timer)

    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpiration: null
    })

    router.replace({ name: 'coaches' })
  }
}
