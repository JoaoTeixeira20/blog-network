import React from 'react';
import './App.css';
import axios from 'axios'
//import { HashRouter as Router , Route, Switch, Link } from 'react-router-dom';
import { BrowserRouter as Router , Route, Switch, Link } from 'react-router-dom';
import Header from './components/layout/Header'

function App() {
  
  const [ Users, setUsers ] = React.useState([])
  const [ Posts, setPosts ] = React.useState([])
  
  const fetchUsers = async () =>{
    const response = await axios.get('api/users',{timeout: 1000})
    const filtereddata = response.data.map(user => {return {username:user.username}})
    setUsers(filtereddata)
  }

  const fetchPosts = async () =>{
    const response = await axios.get('api/posts',{timeout: 1000})
    const filtereddata = response.data.map(post => {return {author:post.author.username,
                                                            title:post.title,
                                                            content:post.content}})
    setPosts(filtereddata)
  }

  
  
  React.useEffect(() => {
    fetchUsers()
    fetchPosts()
  },[])
  
  return (
    <Router>
      <Header/>
      <Switch>
        <Route exact path="/">
          <div>home</div>
        </Route>
        <Route path="/posts">
          <div className="App">
            <div>Posts list</div>
            {Posts.map((post, index) => {
              return(<div style={{display:'flex',flexDirection:'column', justifyContent:"center"}} key={index}>
              <p>Author: {post.author}</p>
              <p>Title: {post.title}</p>
              <p>Description: {post.content}</p>
              </div>)
            })}
          </div>
        </Route>
        <Route path="/users">
          <div className="App">
          <div>Users list</div>
          {Users.map((user, index) => {
            return(<div style={{display:'flex',flexDirection:'row', justifyContent:"center", paddingRight:"10px"}} key={index}>
                <p>Username: {user.username}</p>
            </div>)
          })}
          </div>
        </Route>
        <Route>
          <div>not found</div>
        </Route>
      </Switch>
    </Router>
    );
  }
  
  export default App;
  