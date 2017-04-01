import React, { PropTypes } from 'react';
import AuthService from '../utils/AuthService'
import Main from '../views/Main'
import Login from '../views/Login'

const auth = new AuthService('3uVwhSDS6b7q1eUazWlz3FHJYnCNOobL', 'icpetcu.eu.auth0.com');


class App extends React.Component {
    render () {
        return auth.loggedIn() ? <Main auth={auth} /> : <Login auth={auth} />;
    }
}

export default App;
