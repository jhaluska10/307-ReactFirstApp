import React, {useState, useEffect} from 'react';

import Table from './Table';
import Form from './Form';
import axios from 'axios';




function MyApp() {
  const [characters, setCharacters] = useState([]);  

    async function removeOneCharacter (index) {
      const char = characters[index];
      let mystr = 'http://localhost:5000/users/';
      const updated = characters.filter((character, i) => {
          return i !== index
        });
      mystr += char.id;
      setCharacters(updated);
      try {
          const response = await axios.delete(mystr);
          return response.data.users_list;     
       }
       catch (error){
          //We're not handling errors. Just logging into the console.
          console.log(error); 
          return false;         
       }

        
      }
      function updateList(person) {
        setCharacters([...characters, person]);
      }
      function updateList(person) {
        setCharacters([...characters, person]);
      }

      async function fetchAll(){
        try {
           const response = await axios.get('http://localhost:5000/users');
           //console.log(response);
           return response.data.users_list;     
        }
        catch (error){
           //We're not handling errors. Just logging into the console.
           console.log(error); 
           return false;         
        }
     }

     useEffect(() => {
      fetchAll().then( result => {
         if (result)
            setCharacters(result);
       });
   }, [] );

   
   async function makePostCall(person){
    try {
       const response = await axios.post('http://localhost:5000/users', person);
       //console.log(response.status)
       return response;
    }
    catch (error) {
       console.log(error);
       return false;
    }
    }


    function updateList(person) { 
      makePostCall(person).then( result => {
      if (result && result.status === 201)
      setCharacters([...characters, result.data] );
      });
      
    }


      return (
        <div className="container">
          <Table characterData={characters} removeCharacter={removeOneCharacter} />
          <Form handleSubmit={updateList} />

        </div>
      )

      
      
}

 


 

export default MyApp;