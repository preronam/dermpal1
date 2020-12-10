import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

// boilerplate components
import Navbar from './components/navbar';
import Member from './components/member';

// material ui components  
import SignupForm from './components/SignupForm-MUI';
import LoginForm from './components/LoginForm-MUI';
import Home from './components/Home-MUI';
import SearchPage from "./components/Searchpage";


class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null,
    };

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  getUser() {
    axios
      .get('/api/user/')
      .then((response) => {
        console.log('Get user response: ');
      
        if (response.data.user) {
          console.log(
            'Get User: There is a user saved in the server session: '
          );

          this.setState({
            loggedIn: true,
            username: response.data.user.username,
          });
        } else {
          console.log('Get user: no user');
          this.setState({
            loggedIn: false,
            username: null,
          });
        }
      })
      .catch((err) => console.log('err', err));
  }

  render() {
    return (
      <div className='App'>
        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        <Route exact path='/' component={Home} />
        <Route path='/login' render={() => <LoginForm updateUser={this.updateUser} />}/>
        <Route path='/signup' render={() => <SignupForm />} />
        <Route path='/search' render={() => <SearchPage/>} />
        <Route path='/member' render={() => <Member/>} />
      </div>
    );
  }
}

export default App;
