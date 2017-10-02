export default {
  user (state) {
    return {
      displayName: state.displayName,
      email: state.email,
      id: state.id
    }
  },
  homesList (state) {
    return Object.keys(state.homes).map(homeId => {
      return {
        label: state.homes[homeId].nickname,
        value: homeId
      }
    })
  },
  defaultHome (state) {
    return Object.keys(state.homes).filter(home => Boolean(state.homes[home].relation))
  }
}
