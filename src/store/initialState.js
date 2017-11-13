export default function getInitialState () {
  return {
    id: null,
    displayName: '',
    email: '',
    selectedHome: null,
    defaultHome: '',
    homes: {},
    messages: {
      events: {},
      notifications: {}
    },
    routines: {},
    errors: {
      login: ''
    },
    appState: {
      activeModalDeviceMenu: {
        deviceId: null,
        deviceMetadata: {},
        deviceStatus: {}
      },
      activeSubscriptions: [],
      isLoadingInitialState: true,
      isLoading: false,
      isFirstLogin: true,
      isAddingZwave: false
    }
  }
}
