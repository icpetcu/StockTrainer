import React from 'react'
import TimeAgo from 'react-timeago'


export class News extends React.Component {

    render() {
        return (
            <div className="w3-card w3-margin-bottom">
                <header className="w3-container w3-teal">
                    <span className="w3-left w3-large"> Breaking news </span>
                    <TimeAgo className="w3-right w3-small w3-padding-small"
                             date={this.props.date} minPeriod={10} />
                </header>

                <div className="w3-container w3-left-align">
                    <p> {this.props.body} </p>
                </div>
            </div>
        );
    }
}


export default News;
