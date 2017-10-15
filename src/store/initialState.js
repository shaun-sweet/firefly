export default function getInitialState () {
  return {
    id: null,
    displayName: '',
    email: '',
    selectedHome: null,
    homes: {},
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
