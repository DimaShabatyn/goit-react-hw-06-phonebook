import React from 'react';
import { TiDelete } from 'react-icons/ti';
import { Btn, Item, List } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';
import { selectFilteredContacts } from 'redux/selectors';

export const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  // console.log(filteredContacts);
  const dispatch = useDispatch();

  const onDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };
  return (
    <List>
      {filteredContacts.map(({ name, number, id }) => {
        return (
          <Item key={id}>
            <span>{name}:</span>
            <span>{number}</span>

            <Btn type="button" onClick={() => onDeleteContact(id)}>
              <TiDelete size="16" />
            </Btn>
          </Item>
        );
      })}
    </List>
  );
};
