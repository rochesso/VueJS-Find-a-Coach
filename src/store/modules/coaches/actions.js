const api = import.meta.env.VITE_API

export default {
  async registerCoach(context, payload) {
    const userId = context.rootGetters.userId
    const coachData = payload
    const response = await fetch(`${api}/coaches/${userId}.json`, {
      method: 'PUT',
      body: JSON.stringify(coachData)
    })

    // const responseData = await response.json()

    if (!response.ok) {
      // error ...
    }

    context.commit('registerCoach', { ...coachData, id: userId })
  },
  async loadCoaches(context) {
    const response = await fetch(`${api}/coaches.json`, {
      method: 'GET'
    })

    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!')
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
