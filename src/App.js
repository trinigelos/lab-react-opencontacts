import './App.css';
import ContactsFull from "./contacts.json";
import { useState } from "react"
import { IconTrash} from '@tabler/icons-react';

function App() {
  const fiveContacts = ContactsFull.slice(0,5)
  const [state, setState] = useState(fiveContacts)

  function addRandom() {
      // get remaining contacts that are not in the state
      const remainingContacts = ContactsFull.filter(
        (contact) => !state.includes(contact)
      );
  
      // no remaining contacts? do nothing
      if (remainingContacts.length === 0) return;
  
    //select random contact
    const randomContact = remainingContacts[Math.floor(Math.random() * remainingContacts.length)]
      
    // update state with the random contact
    setState([...state, randomContact]);
    
   
  }
   //sortName function
   function sortName() {
    const sortedContacts = [...state].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setState(sortedContacts);
  }

  //sortPopularity function
  function sortPopularity(){
      const sortedContacts = [...state].sort((a, b) => b.popularity - a.popularity);
      setState(sortedContacts);
  }

  //delete contact function
  function deleteContact(id) {
    const updatedContacts = state.filter((contact) => contact.id !== id);
    setState(updatedContacts);
  }
  return (
    <div className="App">
      <div className='whole-phone'>
      <h1>CONTACTS</h1>
      <button onClick={addRandom}>add random contact</button>
      <button onClick={sortName}>sort by name</button>
      <button onClick={sortPopularity}>sort by popular</button>
      <table className='table'>
        
      <thead className='thead'>
            <tr className='tr-headings'>
          <th></th>
              
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th className='wonOscar'>Won Oscar</th>
              <th className='wonEmmy'>Won Emmy</th>
              
        </tr>
      </thead>
      <tbody className='tbody'>
        {state.map((contact) => (
          <tr key={contact.id}>
            <td className='trash-td'> 
              <button className='trash-btn' onClick={() => deleteContact(contact.id)}>
                <IconTrash />
                </button>
              </td>
            <td>
              <img 
                className='contact-img'
                src={contact.pictureUrl}
                alt={`Contact of ${contact.name}`}
                style={{ width: "50px" }}
              />
            </td>
            <td>{contact.name}</td>
            <td>{contact.popularity}</td>
            <td>{contact.wonOscar && <span>🏆</span>}</td>
            <td>{contact.wonEmmy && <span>🏆</span>}</td>
            
          </tr>
          
        ))}
      </tbody>
      </table>
      </div>
   
  </div>
);
}

export default App;
