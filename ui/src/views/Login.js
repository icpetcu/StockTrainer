import React from 'react'
import AuthService from '../utils/AuthService'


export class Login extends React.Component {

    render() {
        return (
            <div className="landing w3-black w3-display-container w3-animate-opacity w3-text-white">
                <div className="w3-display-middle">
                    <h1 className="w3-jumbo w3-animate-top">STOCK TRAINER</h1>
                    <hr className="w3-border-grey w3-animate-top" style={{margin:'auto', width: '40%'}} />
                    <p className="w3-large w3-center w3-animate-bottom">
                        Buy LOW, sell HIGH! Let's get started!
                    </p>
                    <div className="w3-center w3-animate-bottom">
                        <button onClick={AuthService.login.bind(this)}
                                className="w3-button w3-deep-orange">
                            Log In
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;
