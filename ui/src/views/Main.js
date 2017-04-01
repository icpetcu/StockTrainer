import React from 'react'
import AuthService from '../utils/AuthService'


export class Main extends React.Component {
    
    render() {
        return (
            <div>
                <h2>Hello after login!</h2>
                <button onClick={AuthService.logout.bind(this)}>Log Out</button>
            </div>
        )
    }
}

export default Main;
