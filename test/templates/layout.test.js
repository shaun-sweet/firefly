import Vue from 'vue'
import { shallow } from 'vue-test-utils'

import Layout from '../../templates/layout.vue'


describe('Layout template', () => {
  it('should render the default layout template', () => {
    const wrapper = shallow(Layout)
    expect(wrapper.element).toMatchSnapshot();
  })
})
