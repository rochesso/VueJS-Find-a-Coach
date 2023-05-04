const api = import.meta.env.VITE_API

export default {
  async contactCoach(context, payload) {
    const newRequest = payload
    const response = await fetch(`${api}/requests/${newRequest.coachId}.json`, {
      method: 'POST',
      body: JSON.stringify(newRequest)
    })
    const responseData = await response.json()
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to send request.')
      throw error
    }
    newRequest.id = responseData.name
    context.commit('addRequest', newRequest)
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId
    const response = await fetch(`${api}/requests/${coachId}.json`, {})
    const responseData = await response.json()
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch requests.')
      throw error
    }
    const requests = []
    for (const key in responseData) {
      const request = { ...responseData[key], id: key }
      requests.push(request)
    }
    context.commit('setRequests', requests)
  }
}
