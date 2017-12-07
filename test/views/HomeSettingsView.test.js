import Vue from 'vue';
import { shallow } from 'vue-test-utils';
import HomeSettingsView from 'src/views/HomeSettingsView.vue';

describe('HomeSettingsView', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(HomeSettingsView);
  })
  it('should render the view correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

})
