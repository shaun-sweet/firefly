import Vue from 'vue';
import { shallow } from 'vue-test-utils';
import DeviceSettingsView from 'src/views/DeviceSettingsView.vue';

describe('DeviceSettingsView', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(DeviceSettingsView);
  })
  it('should render the view correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
  it('should call handleAddZwave when Add Zwave clicked', () => {
    const spy = jest.fn();
    wrapper.vm.handleAddZwave = spy;
    wrapper.update()
    const addButton = wrapper.findAll('q-btn').at(2);
    // console.log(addButton);
    addButton.trigger('click');
    expect(spy).toHaveBeenCalled();
  })
})
