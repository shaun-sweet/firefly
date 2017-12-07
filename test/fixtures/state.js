import getInitialState from 'src/store/initialState'

export const initialState = getInitialState();

export const testState = {
  id: 'abc',
  displayName: 'test name',
  email: 'test@test.com',
  selectedHome: 'abc123',
  defaultHome: '',
  homes: {
    'abc123': {
      nickname: 'home 1',
      role: null,
      devicesViewList: [
        {exportUI:'device1'},
        {exportUI:'device2'}
      ]
    },
    'def123': {
      nickname: 'home 2',
      role: 'owner'
    }
  },
  messages: {
    events: { },
    notifications: {
      status: 'ok',
      altStatus: 'updating'
    }
  },
  routines: {
    a: 'routine 1',
    b: 'routine 2'
  },
  errors: {
    login: ''
  },
  appState: {
    activeModalDeviceMenu: {
      deviceId: 'xyz123',
      deviceMetadata: {
        actions: {
          test1:'test action',
          test2:'test action 2'
        }
      },
      deviceStatus: {
        status: 'ok'
      },
      deviceAlias: 'test alias'
    },
    activeSubscriptions: [],
    isLoadingInitialState: false,
    isLoading: false,
    isFirstLogin: true,
    isAddingZwave: false
  }
}
