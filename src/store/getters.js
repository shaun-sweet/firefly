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

  selectedHome (state) {
    return state.selectedHome
  },

  defaultHome (state) {
    return Object.keys(state.homes).filter(home => state.homes[home].role === 'owner')[0]
  },

  devicesViewList (state) {
    if (!state.appState.isLoadingInitialState) {
      const devicesViewList = state.homes[state.selectedHome].devicesViewList
      return Object.keys(devicesViewList).map(deviceId => devicesViewList[deviceId])
    }
  }

  // notifications (state, getters) {
  //   const selectedHome = state.homes[getters.selectedHome]
  //   return Object.keys(selectedHome.notifications).map(id => selectedHome.notifications[id])
  // },

  // events (state, getters) {
  //   const selectedHome = state.homes[getters.selectedHome]
  //   return Object.keys(selectedHome.events).map(id => selectedHome.events[id])
  // }
}
