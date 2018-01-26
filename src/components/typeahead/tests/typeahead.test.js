// @ts-check

import React from 'react';
import ReactDOM from 'react-dom';
import Typeahead, { INITIAL_STATE } from './../components/typeahead.component';
import { shallow } from 'enzyme';

// Just wanted to try out testing
describe('<Typeahead>', () => {

  it('renders <Typeahead> without crashing ', () => {
    const div = document.createElement('div');
    const typeaheadComponent = ReactDOM.render(<Typeahead />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should have an init state ', () => {
    const div = document.createElement('div');
    const typeaheadComponent = ReactDOM.render(<Typeahead />, div);
    const initState = typeaheadComponent.state;

    expect(initState).toEqual(INITIAL_STATE);
  });

  describe('when "ba" is typed in the input', () => {
    it('should show "ba" on the search property of state', () => {
      const typeaheadComponent = shallow(<Typeahead/>)
      const input = typeaheadComponent.find('input');

      input.simulate('change', {target: { value: 'ba'}})
      const searchState = typeaheadComponent.state('search');
  
      expect(searchState).toEqual('ba');
    });

    it('should a have list of all countries begining with "ba"', () => {

      const typeaheadComponent = shallow(<Typeahead/>);
      const input = typeaheadComponent.find('input');

      input.simulate('change', {target: { value: 'ba'}})
      const countriesState = typeaheadComponent.state('countries');
  
      expect(countriesState).toEqual([ 'Bangladesh', 'Barbados', 'Bahrain', 'Bahamas' ]);
    });

    it('should show List', () => {

      const typeaheadComponent = shallow(<Typeahead/>);
      const input = typeaheadComponent.find('input');

      input.simulate('change', {target: { value: 'ba'}})
      const showList = typeaheadComponent.state('showList');
  
      expect(showList).toEqual(true);
    });
  });
});