export default function getInitialState () {
  return {
    id: null,
    displayName: '',
    email: '',
    selectedHome: null,
    defaultHome: '',
    homes: {},
    forceRefresh: false,
    messages: {
      events: {},
      notifications: {}
    },
    locationStatus: {
      lastMetadataUpdate: 0,
      security: {
        status: 'unknown'
      },
      mode: 'unknown'
    },
    routines: {},
    errors: {
      login: ''
    },
    appState: {
      activeModalDeviceMenu: {
        deviceId: null,
        deviceMetadata: {},
        deviceStatus: {},
        deviceAlias: ''
      },
      activeSubscriptions: [],
      isLoadingInitialState: true,
      isLoading: false,
      isFirstLogin: true,
      isAddingZwave: false
    }
  }
}
