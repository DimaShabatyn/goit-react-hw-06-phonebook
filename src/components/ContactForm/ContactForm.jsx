import { Formik } from 'formik';
import * as yup from 'yup';
import { notifyOptions } from 'utils/notify';
import { toast } from 'react-toastify';


import {
  Button,
  ErrorMessage,
  FieldFormik,
  Form,
  FormField,
} from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/selectors';
import { addContact } from 'redux/contactsSlice';

const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d`Artagnan'
    )
    .required(),
  number: yup
    .string()
    .trim()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required(),
});

const initialValues = { name: '', number: '' };
export const ContactForm = () => {

const contacts = useSelector(selectContacts);
const dispatch = useDispatch();

const isExist = ({ name, number }) => {
  const normalizedName = name.toLowerCase().trim();
  const normalizedNumber = number.trim();

  const dublicate = contacts.some(
    contact =>
      contact.name.toLowerCase().trim() === normalizedName ||
      contact.number.trim() === normalizedNumber
  );
  return dublicate;
};

const onAddContact = ({ name, number }) => {
  if (isExist({ name, number })) {
    return toast.error(`This contact is already in contacts`, notifyOptions);
  }
  const action = addContact({ name, number });
  dispatch(action);
};

  return (
    <Formik
      initialValues = {initialValues}
      onSubmit={(values, actions) => {
        onAddContact({ ...values });
        actions.resetForm();
      }}
      validationSchema={schema}
    >
      <Form autoComplete="off">
        <FormField htmlFor="name">
          Name
          <FieldFormik
            type="text"
            name="name"
          />
          <ErrorMessage name="name" component="span" />
        </FormField>
        <FormField htmlFor="number">
          Number
          <FieldFormik
            type="text"
            name="number"
          />
          <ErrorMessage name="number" component="span" />
        </FormField>
        <Button type="submit">Add contact</Button>
      </Form>
    </Formik>
  );
};
