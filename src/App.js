import React from 'react';
import './App.css';
import axios from 'axios'
import { HashRouter as Router , Route, Switch, Link } from 'react-router-dom';

function App() {

  const [ Users, setUsers ] = React.useState([])

  const fetchUsers = async () =>{
    const response = await axios.get('/users',{timeout: 1000})
    const filtereddata = response.data.map(user => {return {username:user.username}})
    setUsers(filtereddata)
  }

  React.useEffect(() => {fetchUsers()},[])

  return (
    <div className="App">
      <div>Users list</div>
      {Users.map((user, index) => {
        return(<div style={{display:'flex',flexDirection:'row'}} key={index}>
          <p>Username:</p>
          <p>{user.username}</p>
        </div>)
      })}
    </div>
  );
}

export default App;
