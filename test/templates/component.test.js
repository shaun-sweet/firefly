import Vue from 'vue'
import { shallow } from 'vue-test-utils'

import Component from '../../templates/component.vue'


describe('Component template', () => {
  it('should render the default component template', () => {
    const wrapper = shallow(Component)
    expect(wrapper.element).toMatchSnapshot();
  })
})
