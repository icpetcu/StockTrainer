import React from 'react'
import News from './News'


const newsData = [
    {'date': '2 hours ago', 'headline': 'Breaking News', 'text': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt'},
    {'date': '2 hours ago', 'headline': 'Breaking News', 'text': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt'},
    {'date': '2 hours ago', 'headline': 'Breaking News', 'text': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt'}

];


export class NewsContainer extends React.Component {

    render() {
        let news = newsData.map(
            (e, i) => <News key={i} data={e} />
        );

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