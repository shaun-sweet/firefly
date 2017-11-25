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
    addButton.trigger('click');
    expect(spy).toHaveBeenCalled();
  });
  it('should call handleRemoveZwave when Add Zwave clicked', () => {
    const spy = jest.fn();
    wrapper.vm.handleRemoveZwave = spy;
    wrapper.update()
    const removeButton = wrapper.findAll('q-btn').at(3);
    removeButton.trigger('click');
    expect(spy).toHaveBeenCalled();
  });
  it('should call handleCancelZwave when Add Zwave clicked', () => {
    const spy = jest.fn();
    wrapper.vm.handleCancelZwave = spy;
    wrapper.update()
    const cancelButton = wrapper.findAll('q-btn').at(4);
    cancelButton.trigger('click');
    expect(spy).toHaveBeenCalled();
  });
  it('should call handleRepairZwave when Add Zwave clicked', () => {
    const spy = jest.fn();
    wrapper.vm.handleRepairZwave = spy;
    wrapper.update()
    const repairButton = wrapper.findAll('q-btn').at(5);
    repairButton.trigger('click');
    expect(spy).toHaveBeenCalled();
  });

})
