export default {
  contactCoach(context, payload) {
    const newRequest = {
      ...payload,
      id: new Date().toISOString()
    }
    console.log(newRequest)
    context.commit('addRequest', newRequest)
  }
}
