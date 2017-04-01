import React from 'react'


export class News extends React.Component {

    render() {
        return (
            <div className="w3-card w3-margin-bottom">
                <header className="w3-container w3-teal">
                    <span className="w3-left w3-large"> {this.props.data.headline} </span>
                    <span className="w3-right w3-small w3-padding-small"> {this.props.data.date} </span>
                </header>

                <div className="w3-container w3-left-align">
                    <p> {this.props.data.text} </p>
                </div>
            </div>
        );
    }
}


export default News;
