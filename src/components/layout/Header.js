import React from 'react';
import { Link } from "react-router-dom";
import { Navbar, Switch, Route } from 'reactstrap'

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
        collapsed: true
    };
  }
  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed  
    });
  }
  render() { 

    return ( 
      <div>
        <a href="/">home</a>
        <a href="/posts">posts</a>
        <a href="/users">users</a>
    </div>
    )
  }
}
 
export default Header;