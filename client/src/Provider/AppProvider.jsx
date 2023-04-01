import React, { Children } from 'react'
import { userContext } from '../context/UserContext';
import { GetUser } from '../api/user';

class AppProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }

        this.logout = this.logout.bind(this);
    }

    componentDidMount () {
        if(localStorage.getItem('user')) {
            GetUser(JSON.parse(localStorage.getItem('user')).userData.username).then(res => {
                this.setState({
                    user: res.data
                })
            })
        } else {
            this.setState({
                user: {}
            })
        }
    }

    logout() {
        this.setState({user: {}});
        localStorage.removeItem('user')
        window.location.reload();
    }

    render() {
        const value = {
        user: this.state.user,
        logout: this.logout
    }
        return ( 
            <userContext.Provider value={value}> 
            {this.props.children}
        </userContext.Provider>
        )
    }
}


export default AppProvider
