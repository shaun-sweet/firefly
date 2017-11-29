import getters from 'src/store/getters';

import {initialState, testState} from '../fixtures/state'

describe('getters.js', () => {
  it('should return user information object', () => {
    const expectedResult = {
      displayName: testState.displayName,
      email: testState.email,
      id: testState.id
    }
    expect(getters.user(testState)).toEqual(expectedResult);
  });
  it('should return homesList array',() => {
    const expectedResult = [
      {
        label: 'home 1',
        value: 'abc123'
      },
      {
        label: 'home 2',
        value: 'def123'
      }
    ]
    expect(getters.homesList(testState)).toEqual(expectedResult);
  });
  it('should return the selectedHome (object or id?)', () => {
    expect(getters.selectedHome(testState)).toEqual('abc123')
  });
  it('should return isLoadingIntialState property', () => {
    expect(getters.isLoadingInitialState(initialState)).toBe(true)
    expect(getters.isLoadingInitialState(testState)).toBe(false)
  });
  it('should return the defaultHome from state', () => {
    let defaultHome ='abc123';
    let state = {...testState};
    state.defaultHome = defaultHome
    expect(getters.defaultHome(state)).toEqual(defaultHome)
  });
  it('should return the owners defaultHome', () => {
    let defaultHome = 'def123';
    expect(getters.defaultHome(testState)).toEqual(defaultHome)
  });
  it('should return devicesViewList',() => {
    const expectedResult = [{exportUI:'device1'}, {exportUI:'device2'}];
    expect(getters.devicesViewList(testState, getters)).toEqual(expectedResult);
    const state = {...testState};
    state.selectedHome='def123';
    expect(getters.devicesViewList(state, getters)).toEqual([]);
  });
  it('should return deviceModalActions', () => {
    const expectedResult = ['test action', 'test action 2']
    expect(getters.deviceModalActions(testState)).toEqual(expectedResult);
    expect(getters.deviceModalActions(initialState)).toEqual([])
  });
  it('should return deviceModalStatus', () => {
    const expectedResult = {
      status: 'ok'
    }
    expect(getters.deviceModalStatus(testState)).toEqual(expectedResult);
    expect(getters.deviceModalStatus(initialState)).toEqual({});

  });
  it('should return modalDeviceId', () => {
    expect(getters.modalDeviceId(testState)).toBe('xyz123')
  });
  it('should return modalDeviceAlias', () => {
    const expectedResult = 'test alias'
    expect(getters.modalDeviceAlias(testState)).toEqual(expectedResult);
    expect(getters.modalDeviceAlias(initialState)).toEqual('');
  });
  it('should return notifications in reverse order', () => {
    const {altStatus, status} = testState.messages.notifications;
    const expectedResult = [altStatus, status];
    // note using _.values doesn't guaranty array order
    expect(getters.notifications(testState)).toEqual(expectedResult)
  });
  xit('should return the array of events', () => {
    // not sure what this should look like
  });
  it('should return the routines values', () => {
    const {a, b} = testState.routines;
    const expectedResult = [a, b];
    // note using _.values doesn't guaranty array order
    expect(getters.routines(testState)).toEqual(expectedResult);

  })

})
