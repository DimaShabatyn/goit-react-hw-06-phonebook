import { notifyOptions } from 'utils/notify';
import { toast } from 'react-toastify';

export const selectContacts = store => store.contacts.items;
export const selectFilter = store => store.filter;

export const selectFilteredContacts = store => {
  const { filter, contacts } = store;
  if (!filter) {
    return contacts.items;
  }
  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.items.filter(
    ({ name, number }) =>
      name.toLowerCase().trim().includes(normalizedFilter) ||
      number.trim().includes(normalizedFilter)
  );

  if (normalizedFilter && !filteredContacts.length) {
    toast.warn(`No contacts matching your request`, notifyOptions);
  }
  return filteredContacts;
};
