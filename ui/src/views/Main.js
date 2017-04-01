import React from 'react'
import Header from '../components/Header'
import Portfolio from '../components/Portfolio'


export class Main extends React.Component {
    
    render() {
        return (
            <div style={{height: '100%'}}>
                <Header />

                <div className="w3-row w3-padding-24">
                    <div className="w3-col m4 w3-center">
                        Left
                    </div>

                    <div className="w3-col m4 w3-center">
                        <Portfolio />
                    </div>

                    <div className="w3-col m4 w3-center">
                        Right
                    </div>

                </div>
            </div>
        )
    }
}

export default Main;
