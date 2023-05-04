export default {
  getRequests(state, getters, rootState, rootGetters) {
    const userId = rootGetters.userId
    return state.requests.filter((request) => request.coachId === userId)
  },
  hasRequests(state) {
    return state.requests && state.requests.length > 0
  }
}
