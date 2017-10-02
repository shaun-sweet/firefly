export default function getInitialState () {
  return {
    id: null,
    displayName: '',
    email: '',
    selectedHome: null,
    homes: {},
    devices: {},
    devicesView: {},
    errors: {
      login: ''
    }
  }
}
