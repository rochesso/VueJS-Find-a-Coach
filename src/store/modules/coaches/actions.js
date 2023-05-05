const api = import.meta.env.VITE_API

export default {
  async registerCoach(context, payload) {
    const userId = context.rootGetters.userId
    const token = context.rootGetters.token
    const coachData = payload
    const response = await fetch(`${api}/coaches/${userId}.json?auth=${token}`, {
      method: 'PUT',
      body: JSON.stringify(coachData)
    })

    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.error || 'Failed to register!')
      throw error
    }

    context.commit('registerCoach', { ...coachData, id: userId })
  },
  async loadCoaches(context, payload) {
    context.commit('setCurrentTime')
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return
    }
    context.commit('setLastFetch')
    const response = await fetch(`${api}/coaches.json`, {
      method: 'GET'
    })
    const responseData = await response.json()
    if (!response.ok) {
      const error = new Error(responseData.error || 'Failed to fetch!')
      throw error
    }
    const coaches = []
    for (const key in responseData) {
      const coach = { ...responseData[key], id: key }
      coaches.push(coach)
    }
    context.commit('setCoaches', coaches)
  }
}
