import React from 'react';
import { shallow, mount } from 'enzyme';

import Timeline from '../Timeline';

describe('Timeline', () => {
  let wrapper;

  it('wraps content in a div with .notificationsFrame class', () => {
    wrapper = shallow(<Timeline />);
    expect(wrapper.find('.notificationsFrame').length).toEqual(1);
  });

  it('has a title of Timeline', () => {
    wrapper = mount(<Timeline />)
    expect(wrapper.find('.title').text()).toBe("Timeline")
  })

  describe('search button', () => {
    let search;
    beforeEach(() => wrapper = mount(<Timeline />))
    beforeEach(() => search = wrapper.find('input.searchInput'))

    it('starts out hidden', () => {  
      expect(search.hasClass('active')).toBeFalsy()
    })
    it('becomes visible after being clicked on', () => {
      const icon = wrapper.find('.searchIcon')
      icon.simulate('click')
      expect(search.hasClass('active')).toBeTruthy()
    })
  })

  describe('status updates', () => {
    it('has 4 status updates at minimum', () => {
      wrapper = shallow(<Timeline />)
      expect(
        wrapper.find('ActivityItem').length
      ).toBeGreaterThan(3)
    })
  })

})