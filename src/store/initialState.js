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
    devicesView: {},
    errors: {
      login: ''
    },
    appState: {
      isLoading: false,
      isFirstLogin: true,
      isAddingZwave: false
    }
  }
}
