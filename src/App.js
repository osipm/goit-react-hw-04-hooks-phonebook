import React, { Component } from 'react';
import { v4 } from 'uuid';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = ({ name, number }) => {
    this.setState(prevState => {
      if (prevState.contacts.find(contact => contact.name === name)) {
        alert(`${name} is already in the contacts`);
        return;
      }

      return {
        contacts: [
          ...prevState.contacts,
          {
            name,
            number,
            id: v4(),
          },
        ],
      };
    });
  };

  handleFilterContacts = e => {
    return this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normaziledFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normaziledFilter),
    );
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));

    if (contacts) {
      this.setState({ contacts: contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.getFilteredContacts(contacts, filter);
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2>Contacts</h2>
        <Filter filter={filter} onHandleChange={this.handleFilterContacts} />
        <ContactList
          contacts={filteredContacts}
          handleDelete={this.handleDeleteContact}
        />
      </div>
    );
  }
}
export default App;
