import Vue from 'vue';
import { shallow } from 'vue-test-utils';
import EventMessage from '@/EventMessage.vue';

describe('EventMessage', () => {
  let wrapper;
  let propsData;
  beforeEach(() => {
    propsData = {
      device: "test device",
      state: "on",
      timestamp: 0
    }
    wrapper = shallow(EventMessage,{
      propsData
    });
  })

  it('should render EventMessage correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  });
  it('should render the props', () => {
    const divs = wrapper.findAll('div')
    const props = ['device', 'state', 'timestamp']
    const numDivs = divs.length - 1
    for(let i = 0; i <= numDivs; i++){
      for(let index in props){
        let prop = props[index]
        let div = divs.at(i)
        if(div.hasClass(prop)){
          expect(div.text()).toBe(propsData[prop].toString())
          break;
        }
      }
    }
  })

})
