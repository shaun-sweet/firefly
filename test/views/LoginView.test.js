import { shallow, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import LoginView from 'src/views/LoginView.vue'
import getters from 'src/store/getters'
import {initialState, testState} from '../fixtures/state'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('LoginView', () => {
  let wrapper;
  let store;
  let actions;
  let mutations;
  let state;
  let spy;
  beforeEach(() => {
    spy = jest.fn()
    state = {...testState}
    actions = {
      logOut: jest.fn(),
      login: jest.fn()
    }
    mutations = {
      ERROR_LOGIN: jest.fn()
    }
    store = new Vuex.Store({
      state,
      actions,
      mutations
    })
    wrapper = shallow(LoginView,{ store, localVue });
  })
  it('should render the LoginView correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should call handleLogout and dispatch action', () => {
    store.hotUpdate({
      actions: { logOut: spy }
    })
    wrapper.findAll('q-btn').at(1).trigger('click');
    expect(spy).toHaveBeenCalled()
  });

  it('should call login and dispatch action', () => {
    const errMsg = "test error"
    const email = 'test@test.com'
    const password = 'password'
    // TODO: Potentially to mock out attemptLogin on firebase
    // spy = jest.fn((email, password) => {
    //   return new Promise((resolve, reject) => {
    //     if( email && password === 'password'){
    //       return resolve(email)
    //     } else {
    //       reject(errMsg)
    //     }
    //   })
    // })
    spy = jest.fn()
    wrapper.vm.login = spy
    wrapper.update()
    wrapper.setData(email, password)
    wrapper.findAll('q-btn').at(0).trigger('click');
    expect(spy).toHaveBeenCalled();
  });

})
