// @ts-check

import React from 'react';
import country$, { activeItem$ } from './../typeahead-message.service';
import PropTypes from 'prop-types';

const TypeaheadItem = (props) => {
  const { 
    item, 
    activeItem, 
    itemIndex 
  } = props;

  // send selected country to typeahead component
  const handleClick = () => {
    country$.next(item);
  }

  // send itemIndex of item which currently has mouse over to typeahead
  const handleMouseOver = () => {
    activeItem$.next(itemIndex);
  }

  // set compoenent class names
  const classNames = () => {
    return "typeahead__list-item " + (itemIndex === activeItem? 'typeahead__list-item--active' : '');
  }
  
  return ( 
    <li
      className={classNames()} 
      onMouseOver={handleMouseOver} 
      onClick={handleClick}
    >
      {item}
    </li>
  )
}

TypeaheadItem.propType = {
  item: PropTypes.string,
  activeItem:  PropTypes.number,
  itemIndex: PropTypes.number,
}

export default TypeaheadItem;
