import React, { Component } from 'react'
import { userContext } from '../context/UserContext';
import { GetUser } from '../api/user';
import { UpdateVisitingCount } from '../api/other';

class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      loadingUser: false,
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.userData.username) {
      this.loadUser(storedUser.userData.username);
    }
  }

  loadUser(username) {
    if (this.state.user.username !== username && !this.state.loadingUser) {
      this.setState({ loadingUser: true });
      GetUser(username)
        .then((res) => {
          this.setState({
            user: res.data,
            loadingUser: false,
          });
        })
        .catch(() => {
          this.setState({
            loadingUser: false,
          });
        });
    }
  }

  // Lösning på att den endast körs en gång, körs när komponenten förstörs, i och med att hela applikationer är wrappad runt denna så kommer den bara köras när användaren lämnar sidan
  componentWillUnmount() {
    var uniqueUserVisiting = null;

    if(localStorage.getItem('visited')) {
      console.log("Återkommande")
      uniqueUserVisiting = true;
    } else {
      localStorage.setItem('visited', true)
      console.log("Unik användare")
      uniqueUserVisiting = false;
    }
    UpdateVisitingCount(uniqueUserVisiting)
  }

  logout() {
    this.setState({ user: {} });
    localStorage.removeItem('user');
    window.location.reload();
  }

  render() {
    const value = {
      user: this.state.user,
      logout: this.logout,
    };
    return (
      <userContext.Provider value={value}>
        {this.state.loadingUser ? (
          <p>Loading...</p>
        ) : (
            this.props.children
        )}
      </userContext.Provider>
    );
  }
}

export default AppProvider;