import React, { PropTypes } from 'react'
import AuthService from '../utils/AuthService'


export class Main extends React.Component {
    static propTypes = {
        auth: PropTypes.instanceOf(AuthService)
    };

    render() {
        const { auth } = this.props;
        return (
            <div>
                <h2>Hello after login!</h2>
                <button onClick={auth.logout.bind(this)}>Log Out</button>
            </div>
        )
    }
}


export default Main;
