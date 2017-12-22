// import Vue from 'vue'
import { mount } from 'vue-test-utils'
import ProfileView from 'src/views/ProfileView.vue'
// import { shallow, createLocalVue } from 'vue-test-utils'
// import Vuex from 'vuex'
// import getters from 'src/store/getters'
// import {initialState, testState} from '../fixtures/state'

describe('ProfileView', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(ProfileView)
  })
  it('should render the view correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
// const localVue = createLocalVue()

// localVue.use(Vuex)

// describe('ProfileView', () => {
//   let wrapper;
//   let store;
//   let state;
//   let spy;
//   beforeEach(() => {
//     spy = jest.fn()
//     state = {...testState}
//     store = new Vuex.Store({
//       state,
//       getters
//     })
//     wrapper = shallow(ProfileView,{ store, localVue });
//   })
//   it('should render the view correctly', () => {
//     expect(wrapper.element).toMatchSnapshot();
//   });

// })
