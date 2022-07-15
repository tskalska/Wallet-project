import { useState, useRef } from 'react';
import ModalSelectOption from './ModalSelectOption';

function ModalSelect({ income, categories, setCategory, currentCategory }) {
  const [select, openSelect] = useState(false);
  const incomeCategories = categories.filter(
    category => category.type === 'income',
  );
  const spendingCategories = categories.filter(
    category => category.type === 'spending',
  );
  
  const refCheckbox = useRef(null);
  const closeSelect = () => {
    refCheckbox.current.checked = false;
  }

  return (
    <>
      <div id="select-box" className="ModalSelect">
        <input
          type="checkbox"
          id="options-view-button"
          ref={refCheckbox}
          onClick={() => openSelect(!select)}
        />
        <div id="select-button">
          <div id="selected-value">
            <span
              className="ModalSelect__selected"
              style={{ opacity: currentCategory === 'null' ? '1' : '0' }}
            >
              Выберите категорию
            </span>
          </div>
        </div>
        <div id="options" onClick={()=>closeSelect()}>
          {income
            ? incomeCategories.map(({ _id, nameDropdown }) => (
                <ModalSelectOption
                  key={_id}
                  value={_id}
                  name={nameDropdown}
                  addClass="income"
                  setCategory={setCategory}
                  currentCategory={currentCategory}
                  select={select}
                />
              ))
            : spendingCategories.map(({ _id, nameDropdown }) => (
                <ModalSelectOption
                  key={_id}
                  value={_id}
                  name={nameDropdown}
                  addClass="spending"
                  setCategory={setCategory}
                  currentCategory={currentCategory}
                  select={select}
                />
              ))}
        </div>
      </div>
    </>
  );
}

export default ModalSelect;
