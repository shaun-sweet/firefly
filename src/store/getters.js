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

  isLoadingInitialState (state) {
    return state.appState.isLoadingInitialState
  },

  defaultHome (state) {
    return Object.keys(state.homes).filter(home => state.homes[home].role === 'owner')[0]
  },

  devicesViewList (state, getters) {
    if (!getters.isLoadingInitialState) {
      const devicesViewList = state.homes[state.selectedHome].devicesViewList
      const devicesArray = Object.keys(devicesViewList).map((deviceId) => devicesViewList[deviceId])
      return devicesArray.filter((device) => device.export_ui)
    }
    return []
  }
}
