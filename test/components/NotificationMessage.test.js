import Vue from 'vue';
import { shallow } from 'vue-test-utils';
import NotificationMessage from '@/NotificationMessage.vue';

describe('NotificationMessage', () => {
  let wrapper;
  let propsData;
  beforeEach(() => {
    propsData = {
      trigger: "test trigger",
      timestamp: 0
    }
    wrapper = shallow(NotificationMessage,{
      propsData
    });
  })

  it('should render NotificationMessage correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  });
  it('should render the props', () => {
    const triggerDiv = wrapper.find('.device')
    expect(triggerDiv.text()).toBe(propsData.trigger)
    const timestampSpan = wrapper.find('span')
    expect(timestampSpan.text()).toBe(propsData.timestamp.toString())
  })

})
