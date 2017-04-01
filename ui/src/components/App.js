import React from 'react';
import AuthService from '../utils/AuthService'
import Main from '../views/Main'
import Login from '../views/Login'


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'view': AuthService.loggedIn() ? 'main' : 'landing'
        };
        AuthService.on('profile_updated', () => this.setState({'view': 'main'}));
    }

    render () {
        return this.state.view == 'main' ? <Main /> : <Login />;
    }
}

export default App;
