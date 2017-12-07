import { mount, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import RoutinesView from 'src/views/RoutinesView.vue'
import getters from 'src/store/getters'
import {initialState, testState} from '../fixtures/state'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('RoutinesView', () => {
  let wrapper;
  let store;
  let state;
  let spy;
  let actions;
  beforeEach(() => {
    spy = jest.fn()
    state = {...testState}
    actions = {  getRoutines: spy  }
    store = new Vuex.Store({
      state,
      getters,
      actions
    })
    wrapper = mount(RoutinesView,{ store, localVue });
  })
  it('should render the RoutinesView correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should call dispatch getRoutines beforeCreate', () => {
    expect(spy).toHaveBeenCalled()
  });

})
