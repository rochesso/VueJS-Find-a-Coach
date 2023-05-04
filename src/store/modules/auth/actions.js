const signupURL = import.meta.env.VITE_SIGNUP
const loginURL = import.meta.env.VITE_LOGIN

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
    localStorage.setItem('token', responseData.idToken)
    localStorage.setItem('userId', responseData.localId)

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn
    })
  },
  tryLogin(context) {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
        tokenExpiration: null
      })
    }
  }
}
