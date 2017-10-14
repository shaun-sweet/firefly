export default function getInitialState () {
  return {
    id: null,
    displayName: '',
    email: '',
    selectedHome: null,
    homes: {},
    devices: {
      // *** homeId is ACTUALLY the homeId as the key that selected home uses to find the correct data
      homeId: {
        // deviceId's as keys
      }
    },
    messages: {
      events: {},
      notifications: {}
    },
    devicesView: {},
    errors: {
      login: ''
    },
    appState: {
      activeSubscriptions: [],
      isLoading: false,
      isFirstLogin: true,
      isAddingZwave: false
    }
  }
}
