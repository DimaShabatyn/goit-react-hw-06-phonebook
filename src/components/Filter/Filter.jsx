import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { Input, LabelDescr } from './Filter.styled';
import { LabelWrapper } from 'components/ContactForm/ContactForm.styled';
import { selectFilter } from 'redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filterSlice';

const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  function changeFilter(e) {
    dispatch(setFilter(e.target.value.toLowerCase()));
  }

  return (
    <LabelDescr>
      <LabelWrapper>
        <BsSearch size="16" /> Find contacts by name
      </LabelWrapper>
      <Input
        type="text"
        value={filter}
        onChange={changeFilter}
        placeholder="search contacts"
      />
    </LabelDescr>
  );
};

export default Filter;

