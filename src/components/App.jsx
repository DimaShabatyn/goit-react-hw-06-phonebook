import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout/Layout';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { Header } from './Header/Header';
import Filter from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import {selectContacts} from 'redux/selectors'


// render > didMount > getItem > setState > update > render > didUpdate > setItem

export const App = () => {
  const contacts = useSelector(selectContacts);

  return (
    <>
      <Layout>
        <Section title="Phonebook">
          <ContactForm />
          {contacts.length > 0 && (
            <>
              <Header title="Contacts" />
              <Filter />
              <ContactList />
            </>
          )}
        </Section>
        <GlobalStyle />
      </Layout>
      <ToastContainer transition={Slide} draggablePercent={60} />
    </>
  );
};

// export const App = () => {
//   const [contacts, setContacts] = useLocaStorage('contacts', initialContacts);
//   const [filter, setFilter] = useState('');

//   const addContact = newContact => {
//     const isExist = contacts.some(
//       ({ name, number }) =>
//         name.toLowerCase() === newContact.name.toLowerCase() ||
//         number.trim() === newContact.number.trim()
//     );
//     if (isExist) {
//       return alert(`Contact ${newContact.name} already exists`);
//     }
//     setContacts(contacts => [{ id: nanoid(), ...newContact }, ...contacts]);
//   };

//   const deleteContact = idContact => {
//     setContacts(contacts.filter(contact => contact.id !== idContact));
//   };

//   const changeFilter = evt => setFilter(evt.target.value.toLowerCase());

//   const getVisibleContacts = () => {
//     const normalizedFilter = filter.toLowerCase();
//     const filteredContacts = contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//     if (normalizedFilter && !filteredContacts.length) {
//       return toast.info('No contacts', notifyOptions);
//     }
//     return filteredContacts;
//   };

//   return (
//     <>
//       <Layout>
//         <Section title="Phonebook">
//           <ContactForm onAddContact={addContact} />
//           {contacts.length > 0 && (
//             <>
//               <Header title="Contacts" />
//               <Filter onChange={changeFilter} value={filter} />
//               <ContactList
//                 contacts={getVisibleContacts()}
//                 onDelete={deleteContact}
//               />
//             </>
//           )}
//         </Section>
//         <GlobalStyle />
//       </Layout>
//       <ToastContainer transition={Slide} draggablePercent={60} />
//     </>
//   );
// };