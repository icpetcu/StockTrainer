import React from 'react'
import AuthService from '../utils/AuthService'


export class Login extends React.Component {
    
    render() {
        return (
            <div>
                <h2>Landing Page</h2>
                <button onClick={AuthService.login.bind(this)}>Log In</button>
            </div>
        )
    }
}

export default Login;
