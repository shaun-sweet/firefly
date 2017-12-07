import Vue from 'vue'
import Vuex from 'vuex'
import * as types from 'src/store/mutation-types'
import mutations from 'src/store/mutations'
import {initialState, testState} from '../fixtures/state'

Vue.use(Vuex)

describe('mutations', () => {
  let state, mutation, store;
  beforeEach(() => {
    state = {...initialState}
    store = new Vuex.Store({
      state,
      mutations
    })
  })
  it('should SAVE_USER_HOMES to the state', () => {
    const homes = {
      id: 'abc',
      nickname: 'test home'
    }
    store.commit(types.SAVE_USER_HOMES, homes)
    expect(store.state.homes).toEqual(homes)
  });

  it('should LOG_USER_OUT and reset state', () => {
    store.replaceState(testState);
    store.commit(types.LOG_USER_OUT)
    expect(store.state).toEqual(initialState);
  });

  it('should SAVE_USER and set user state', () => {
    const user = {
      uid: 'uid1',
      email: 'test@test.com',
      displayName: 'User 1',
      defaultHome: 'abc123'
    }
    const expectedResult = {
      id: user.uid,
      email: user.email,
      displayName: user.displayName,
      defaultHome: user.defaultHome
    }
    store.commit(types.SAVE_USER, user)
    const {id, email, displayName, defaultHome} = store.state
    const result = {id, email, displayName, defaultHome}
    expect(result).toEqual(expectedResult);
  })

  it('should add error msgs to state on ERROR_LOGIN', () => {
    const messages = {
      errorMsg: 'Error Message'
    }
    store.commit(types.ERROR_LOGIN, messages)
    expect(store.state.errors.login).toBe(messages.errorMsg)
  })

  it('should SET_SELECTED_HOME to state', () => {
    const home = 'abc123'
    store.commit('SET_SELECTED_HOME', home)
    expect(store.state.selectedHome).toBe(home)
  })

  xit('should SAVE_DEVICE_VIEW_LIST to state', () => {
    const device = {
      homeId: 'abc123',
      devicesViewList: [
        {exportUI:'device1'}
      ]
    }
    store.commit(types.SAVE_DEVICE_VIEW_LIST, device)
    // need explination on what this mutiation does
    expect(store.state.homes[device.homeID].devicesViewList).toEqual(device.devicesViewList)

  })

  xit('should ADD_AUTOCOMPLETE_FIELDS to state', () => {
    // need to set up test state to test
  })

  xit('should DEVICE_PRIMARY_STATE_UPDATE to state', () => {

  })

  it('should set INITIAL_STATE_NOT_LOADING to false', () => {
    expect(store.state.appState.isLoadingInitialState).toBe(true)
    store.commit(types.INITIAL_STATE_NOT_LOADING)
    expect(store.state.appState.isLoadingInitialState).toBe(false)
  })

  it('should CLEANUP_SUBSCRIPTIONS state', () => {
    store.state.appState.activeSubscriptions = ['test']
    store.commit(types.CLEANUP_SUBSCRIPTIONS)
    expect(store.state.appState.activeSubscriptions).toEqual([])
  })

  it('should ADD_SUBSCRIPTION to state', () => {
    store.state.appState.activeSubscriptions = ['test']
    const subscription = 'sub1'
    store.commit(types.ADD_SUBSCRIPTION, subscription)
    expect(store.state.appState.activeSubscriptions).toEqual(['test', subscription])

  })

  it('should set loading state to true on INITIAL_STATE_IS_LOADING', () => {
    store.state.appState.isLoadingInitialState = false
    store.commit(types.INITIAL_STATE_IS_LOADING)
    expect(store.state.appState.isLoadingInitialState).toBe(true)
  })

  it('should clear CLEAR_DEVICE_MENU_STATE', () => {
    const clearedState = {
      deviceId: null,
      deviceMetadata: {},
      deviceStatus: {},
      deviceAlias: ''
    }

    store.replaceState(testState);
    store.commit(types.CLEAR_DEVICE_MENU_STATE)
    expect(store.state.appState.activeModalDeviceMenu).toEqual(clearedState)
  })

  it('should SET_DEVICE_MENU_STATE', () => {
    const payload = {
      deviceId: 'id1',
      deviceMetadata: 'metadata1',
      deviceStatus: 'ok',
      deviceAlias: 'alias1'}
    store.commit(types.SET_DEVICE_MENU_STATE, payload)
    const result = store.state.appState.activeModalDeviceMenu
    expect(result).toEqual(payload)
  })

  xit('should update on DEVICE_STATE_UPDATE', () => {
    // need to know what the payload should look like for this mutation
  })

  it('should update notifications on NOTIFICATION_UPDATE', () => {
    const notifications = {
      status: 'ok',
      altStatus: 'updating'
    }
    store.state.messages.notifications = notifications
    const update = {
      testStatus: 'test'
    }
    store.commit(types.NOTIFICATION_UPDATE, update)
    expect(store.state.messages.notifications).toEqual({
      ...notifications,
      ...update
    })
  })

  it('should update events on EVENT_UPDATE', () => {
    const events = {
      e1: 'on',
      e2: 'off'
    }
    store.state.messages.events = events
    const update = {
      e3: 'loading'
    }
    store.commit(types.EVENT_UPDATE, update)
    expect(store.state.messages.events).toEqual({
      ...events,
      ...update
    })

  })

  xit('should SAVE_ROUTINES', () => {
    // need to know what payload looks like for this
  })
})
