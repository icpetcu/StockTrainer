import React from 'react'
import AuthService from '../utils/AuthService'


export class Header extends React.Component {

    getName() {
        let profile = AuthService.getProfile();
        let user = profile.user_metadata;
        return user ? user.first_name + ' ' + user.last_name : 'Guest';
    }

    render() {
        return (
            <div className="w3-container w3-black w3-padding">
                <div className="w3-left w3-xlarge"> STOCK TRAINER</div>
                <div className="w3-right">
                    <span className="w3-margin-right"> Welcome back, {this.getName()} </span>
                    <button onClick={AuthService.logout.bind(this)}
                            className="w3-btn w3-deep-orange">
                        Log Out
                    </button>
                </div>
            </div>
        )
    }
}

export default Header;
