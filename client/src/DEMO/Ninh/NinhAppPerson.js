import React, { Component } from 'react';
import './Person.css';
import Person from './Person';

class NinhAppPerson extends Component {
  state = {
    persons: [
      {id:1, name: 'Tran Vu Ninh', age: 21 },
      {id:2, name: 'Ho Duc Long', age: 20 },
      {id:3, name: 'Tran Cong Hoa', age: 24 }
    ],
    otherState: 'some other value',
    showPersons: false
  }


  nameChangedHandler = ( event,id ) => {
    // Tim va return index cua phan tu can sua doi 
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    // copy 1 doi tuong person tim thay tu state ra
    const person = {...this.state.persons[personIndex]};
    // thay doi ten cho doi tuong person do
    person.name = event.target.value;
    // copy danh sach toi tuong gốc tu state
    const persons = [...this.state.persons];
    // gan doi tuong can sua doi
    persons[personIndex] = person;
    // set sua doi danh sach moi
    this.setState( {persons:persons} );
  }
  deletePersonHandler = (personIndex) => {
    const persons = this.state.persons;
    persons.splice(personIndex,1);
    this.setState({persons:persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState( { showPersons: !doesShow } );
  }

  render () {
    const style = {
      backgroundColor: 'yellow',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;

    if ( this.state.showPersons ) {
      persons = (
        <div>
          {this.state.persons.map((person,index) => {
            return <Person 
                      key={person.id}
                      click={() => this.deletePersonHandler(index)}
                      name={person.name}
                      age={person.age}
                      changed={(event) => this.nameChangedHandler(event,person.id)}
                    />
          })}
        </div>
      );
    }

    return (
      <div className="App">
        <h1>Ninh Demo</h1>
        <p>Ninh</p>
        <button
          style={style}
          onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
      </div>
    );
  }
}

export default NinhAppPerson;
