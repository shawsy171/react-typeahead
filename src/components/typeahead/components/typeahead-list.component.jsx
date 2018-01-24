// @ts-check

import React from 'react';
import PropTypes from 'prop-types'; 
import TypeaheadItem from './typeahead-item.component';

const TypeaheadList = (props) => {
  const { 
    countries, 
    search,
    activeItem,
    showList,
  } = props;

  // create new item list
  const itemList = () => {

    return countries.map((country, index) => {
      return (
      <TypeaheadItem
        key={index}
        itemIndex={index}
        activeItem={activeItem} 
        item={country}
      />)
    });
  }
  
  return (
    <div>
      {
        showList && 
        <ul className="typeahead__list" role="menubar" aria-hidden="true">
          { search && search.length > 0 && itemList() }
        </ul>
      }
    </div>
  )
}

TypeaheadList.propTypes = {
  search: PropTypes.string.isRequired,
  countries: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeItem: PropTypes.number.isRequired,
  showList: PropTypes.bool.isRequired,
}

export default TypeaheadList;
