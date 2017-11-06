import get from 'lodash/get'
import values from 'lodash/values'
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
    const devicesViewList = values(get(state.homes[state.selectedHome], 'devicesViewList', []))
    return devicesViewList.filter((device) => device.exportUI)
  },

  deviceModalActions (state) {
    const actions = values(get(state.appState.activeModalDeviceMenu.deviceMetadata, 'actions', {}))
    return actions
  },

  deviceModalStatus (state) {
    return get(state.appState.activeModalDeviceMenu, 'deviceStatus', {})
  },

  modalDeviceId (state) {
    return state.appState.activeModalDeviceMenu.deviceId
  },

  notifications (state) {
    return values(state.messages.notifications).reverse()
  },

  events (state) {
    return values(state.messages.events).reverse()
  }
}
