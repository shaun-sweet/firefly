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
    errors: {
      login: ''
    },
    appState: {
      activeSubscriptions: [],
      isLoadingInitialState: true,
      isLoading: false,
      isFirstLogin: true,
      isAddingZwave: false
    }
  }
}
