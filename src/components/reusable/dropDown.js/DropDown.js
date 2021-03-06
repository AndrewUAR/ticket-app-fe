import React, { useState } from 'react';
import './DropDown.css';

const DropDown = props => {
  const { title, list, label, getDropDownValue } = props;
  let [listOpen, setListOpen] = useState(false);

  const toggleList = () => {
    setListOpen(!listOpen);
  }

  const selectItem = item => {
    getDropDownValue(item);
    setListOpen(!listOpen);
  }

  return (
    <>
      <label htmlFor={label}>{label}</label>
      <div>
        <div className="dd-header" onClick={toggleList}>
          <div className="dd-header-title">{title}</div>
          {
            listOpen 
              ? <i className="fas fa-angle-up"></i>
              : <i className="fas fa-angle-down"></i>
          }
        </div>
        {
          listOpen &&
          <ul className="dd-list">
            {
              list.map(item => 
                <li className="dd-list-item" key={item.id} onClick={() => selectItem(item)}>{item.title}</li>
              )
            }
          </ul>
        }
      </div>
    </>
  )
}

export default DropDown;
