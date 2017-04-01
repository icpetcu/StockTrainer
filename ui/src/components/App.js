import React, { PropTypes } from 'react';
import AuthService from '../utils/AuthService'
import Main from '../views/Main'
import Login from '../views/Login'


class App extends React.Component {
    render () {
        return AuthService.loggedIn() ? <Main /> : <Login />;
    }
}

export default App;
