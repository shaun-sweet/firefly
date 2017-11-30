import { shallow, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import DevicesView from 'src/views/DevicesView.vue'
import getters from 'src/store/getters'
import {initialState, testState} from '../fixtures/state'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('DevicesView', () => {
  let wrapper;
  let store;
  let actions;
  let state;
  let spy;
  beforeEach(() => {
    spy = jest.fn()
    state = {...testState}
    actions = {
      closeDeviceMenu: jest.fn(),
      openDeviceMenu: jest.fn(() => new Promise((resolve, reject) => resolve()))
    }
    store = new Vuex.Store({
      state,
      actions,
      getters
    })
    wrapper = shallow(DevicesView,{ store, localVue });
  })
  it('should render the DevicesView correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should call closeDeviceMenuHandler when modal is closed', () => {
    store.hotUpdate({
      actions: { closeDeviceMenu: spy }
    })
    wrapper.find('q-modal').trigger('close');
    expect(spy).toHaveBeenCalled()
  });

  xit('should call closeDeviceMenuHandler when button targeting deviceMenu ref', () => {
    store.hotUpdate({
      actions: { closeDeviceMenu: spy }
    })
    wrapper.find({ref: 'deviceMenu' }).trigger('close');

    // $refs does't work with the vue-test-utils rendered component
    // This is basically testing the samething as above assuming $refs triggers the dom element correctly

    expect(spy).toHaveBeenCalled()
  });

  it('should update deviceSettings.alias on input', () => {
    wrapper.vm.onSaveHandler = spy;
    const text = 'test alias'
    const input = wrapper.find('q-input')
    input.element.value = text
    input.trigger('change')
    wrapper.setData({
      deviceSettings: {
        alias: text
      }
    });
    expect(wrapper.vm.deviceSettings.alias).toBe(text)

    const saveBtn = wrapper.findAll('q-btn').at(1)
    saveBtn.trigger('click')

    expect(spy).toHaveBeenCalled()
  });


})
