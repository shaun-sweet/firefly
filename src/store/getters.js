export default {
  getUser (state) {
    return state
  },
  getDefaultHome (state) {
    return Object.keys(state.homes).filter(home => Boolean(state.homes[home].relation))
  }
}
