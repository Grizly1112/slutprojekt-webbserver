import React, { Children } from 'react'
import { userContext } from '../context/UserContext';
import { GetUser } from '../api/user';

class AppProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasloaded: false,
            user: {}
        }

        this.logout = this.logout.bind(this);
    }

    componentDidMount () {
        if(localStorage.getItem('user')) {
            GetUser(JSON.parse(localStorage.getItem('user')).userData.username).then(res => {
                this.setState({
                    user: res.data,
                    hasloaded: true
                })
            })
        } else {
            this.setState({
                ...this.state,
                user: {},
                hasloaded: true
            })
        }
    }

    logout() {
        this.setState({...this.state, user: {}});
        localStorage.removeItem('user')
        window.location.reload();
    }

    render() {

        const value = {
            user: this.state.user,
            logout: this.logout,
        }

    console.log(value)
        return ( 
            <userContext.Provider value={value}> 
           {this.state.hasloaded && this.props.children}
        </userContext.Provider>
        )
    }
}


export default AppProvider
