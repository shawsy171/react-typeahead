// @ts-check

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

// components
import TypeaheadList from './typeahead-list.component';

// rxjs
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/takeUntil';

// services
import country$, { activeItem$, checkKeyInput } from './../typeahead-message.service';

// data
import COUNTRIES from './../../../data/countries';


// helpers
import validateInput, { filterCountries } from './../typeahead.helpers';

// contants
import COUNTRY_REGEX from './../typeahead.contants';
export const INITIAL_STATE = {
  search: '',
  selected: false,
  activeItem: -1,
  countries: [],
  showList: false,
};

export class Typeahead extends Component {
  constructor (props) {
    super(props);

    this.destory$ = new Subject();
    
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.state = props;
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside.bind(this), true);

    // update state when country item selected
    country$
      .takeUntil(this.destory$)
      .subscribe((input) => {
      this.setState(() => ({
        search: input,
        selected: true,
        activeItem: -1,
        showList: false,
      }));
    });
    
    // update when active item changes 
    activeItem$
      .takeUntil(this.destory$)
      .subscribe((item) => {
      this.setState(() => ({ 
        activeItem: item,
      }));
    });
  }

  // update state when there is a new input value
  handleChange (e) {
    const input = e.target.value;
    const filteredCountries = filterCountries(input, COUNTRIES);

    if (validateInput(input, COUNTRY_REGEX) || input === '') {
      this.setState(() => ({
        search: input,
        selected: false,
        countries: filteredCountries,
        showList: true,
      }));
    }
  }

  // navigate with arrow keys and update selected country
  handleKeyDown (e) {
    this.setState(checkKeyInput(e.key, this.state));
  }

  handleFocus (e) {
    this.handleChange(e)
  }

  // remove list when click event is outside the component
  handleClickOutside(event) {
    const domNode = ReactDOM.findDOMNode(this);

    if (!domNode || !domNode.contains(event.target)) {
      this.setState(() => ({
        showList: false,
      }))
    }
  }

  // render class names for border change
  classNames () {
    return 'typeahead__input ' + (this.state.selected ? 'typeahead--selected' : '');
  }

  componentWillUnmount () {
    // kill the all streams 
    this.destory$.next();
    this.destory$.complete();

    document.removeEventListener('click', this.handleClickOutside.bind(this), true);
  }

  render () {
    const { 
      search,
      activeItem,
      countries,
      showList,
    } = this.state;

    return (
      <div className="typeahead">
        <input
          type="text" 
          name="typeahead-input"
          placeholder="search..."
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          onFocus={this.handleChange}
          value={search}
          className={this.classNames()}
        />
        <TypeaheadList 
          search={search}  
          countries={countries}
          activeItem={activeItem}
          showList={showList}
        />
      </div>
    );
  };
};

Typeahead.propTypes = {
  search: PropTypes.string,
  selected: PropTypes.bool.isRequired,
  activeItem: PropTypes.number.isRequired,
  countries: PropTypes.arrayOf(PropTypes.string),
  showList: PropTypes.bool.isRequired
}

Typeahead.defaultProps = INITIAL_STATE;

export default Typeahead;