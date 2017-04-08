import React from 'react'
import News from './News'


export class NewsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastTs: null,
            shouldUpdate: true
        }
    }

    componentWillReceiveProps(nextProps, nextState) {
        let s = nextProps.data.length;
        let lastTs = s == 0 ? null : nextProps.data[s - 1].ts;
        if (lastTs != this.state.lastTs) {
            this.setState({
                lastTs: lastTs,
                shouldUpdate: true
            });
        } else {
            this.setState({shouldUpdate: false});
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.shouldUpdate;
    }

    render() {
        let news = this.props.data.map(
            (e, i) => <News key={i} body={e.body} date={e.ts} />
        );
        news.reverse();

        return (
            <div className="news-container">
                <div className="w3-container">
                    {news}
                </div>
            </div>
        );
    }
}


export default NewsContainer;