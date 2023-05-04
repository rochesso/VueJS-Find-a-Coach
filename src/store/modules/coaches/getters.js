export default {
  coaches(state) {
    return state.coaches
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0
  },
  isCoach(state, getters, rootState, rootGetters) {
    const coaches = getters.coaches
    const userId = rootGetters.userId
    return coaches.some((coach) => coach.id === userId)
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch
    const currentTime = state.currentTime
    if (!lastFetch) {
      return true
    } else {
      return (currentTime - lastFetch) / 1000 > 300
    }
  }
}
