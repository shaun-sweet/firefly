import Vue from 'vue'
import { shallow } from 'vue-test-utils'

import Page from '../../templates/page.vue'


describe('Page template', () => {
  it('should render the default page template', () => {
    const wrapper = shallow(Page)
    expect(wrapper.element).toMatchSnapshot();
  })
})
