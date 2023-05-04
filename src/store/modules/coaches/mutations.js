export default {
  registerCoach(state, payload) {
    state.coaches.unshift(payload)
  },
  setCoaches(state, payload) {
    state.coaches = payload
  },
  setLastFetch(state) {
    state.lastFetch = new Date().getTime()
  },
  setCurrentTime(state) {
    state.currentTime = new Date().getTime()
  }
}
