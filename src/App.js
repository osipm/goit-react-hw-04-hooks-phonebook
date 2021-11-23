import { useState, useEffect } from 'react';
import { v4 } from 'uuid';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const lsContacts = localStorage.getItem('contacts');

    if (lsContacts) {
      setContacts(JSON.parse(lsContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    setContacts(prevContacts => {
      if (prevContacts.find(contact => contact.name === name)) {
        alert(`${name} is already in the contacts`);
        return prevContacts;
      }

      return prevContacts.concat({
        name,
        number,
        id: v4(),
      });
    });
  };

  const handleFilterContacts = e => {
    return setFilter(e.target.value);
  };

  const getFilteredContacts = () => {
    console.log(contacts.name);
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  const handleDeleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId),
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <h2>Contacts</h2>
      <Filter filter={filter} onHandleChange={handleFilterContacts} />
      <ContactList
        contacts={getFilteredContacts(contacts, filter)}
        handleDelete={handleDeleteContact}
      />
    </div>
  );
}
