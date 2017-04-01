import React, { PropTypes } from 'react'
import AuthService from '../utils/AuthService'


export class Login extends React.Component {
    static propTypes = {
        auth: PropTypes.instanceOf(AuthService)
    };

    render() {
        const { auth } = this.props;
        return (
            <div>
                <h2>Landing Page</h2>
                <button onClick={auth.login.bind(this)}>Log In</button>
            </div>
        )
    }
}

export default Login;
