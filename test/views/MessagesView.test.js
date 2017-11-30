import { mount, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import MessagesView from 'src/views/MessagesView.vue'
import getters from 'src/store/getters'
import {initialState, testState} from '../fixtures/state'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('MessagesView', () => {
  let wrapper;
  let store;
  let state;
  let spy;
  let actions;
  beforeEach(() => {
    spy = jest.fn()
    state = {...testState}
    actions = {  subscribeToMessages: spy  }
    store = new Vuex.Store({
      state,
      getters,
      actions
    })
    wrapper = mount(MessagesView,{ store, localVue });
  })
  it('should render the MessagesView correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should call dispatch subscribeToMessages beforeCreate', () => {
    expect(spy).toHaveBeenCalled()
  });

})
