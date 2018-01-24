// @ts-check

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

// components
import TypeaheadList from './typeahead-list.component'

// rxjs
import country$, { activeItem$ } from './../typeahead-message.service';

// data
import COUNTRIES from './../../../data/countries';


// helpers
import validateInput, { filterCountries } from './../typeahead.helpers';

// contants
import COUNTRY_REGEX from './../typeahead.contants'
const INITIAL_STATE = {
  search: '',
  selected: false,
  activeItem: -1,
  countries: [],
  showList: false,
};

export class TypeaheadInput extends Component {
  constructor (props) {
    super(props);
    
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.state = props;
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside.bind(this), true);

    // update state when country item selected
    country$.subscribe((input) => {
      this.setState(() => ({
        search: input,
        selected: true,
        activeItem: -1,
        showList: false,
      }));
    });
    
    // update when active item changes 
    activeItem$.subscribe((item) => {
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
    const { 
      activeItem, 
      countries,
      showList
    } = this.state;

    switch (e.key) {
      case 'ArrowUp':
        if (activeItem >= 1) {
          this.setState((prevState) => ({
            activeItem: prevState.activeItem - 1,
          }));
        }
        break;

      case 'ArrowDown':
        if (activeItem <=countries.length - 2) {
          this.setState((prevState) => ({
            activeItem: prevState.activeItem + 1,
          }));
        }
        break;

      case 'Enter':
      if (showList && activeItem > -1) {
        this.setState(() => ({
          search: countries[activeItem],
          selected: true,
          activeItem: -1,
          showList: false,
        }));
      }
        break;
      default:
        return;
    }
  }

  handleFocus () {
    this.setState(() => ({
      showList: true,
    }))
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
    country$.unsubscribe();
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
          onFocus={this.handleFocus}
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

TypeaheadInput.propTypes = {
  search: PropTypes.string,
  selected: PropTypes.bool.isRequired,
  activeItem: PropTypes.number.isRequired,
  countries: PropTypes.arrayOf(PropTypes.string),
  showList: PropTypes.bool.isRequired
}

TypeaheadInput.defaultProps = INITIAL_STATE;