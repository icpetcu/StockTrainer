import React from 'react'
import Header from '../components/Header'
import NewsContainer from '../components/NewsContainer'
import Portfolio from '../components/Portfolio'
import StockChart from '../components/StockChart'


export class Main extends React.Component {
    
    render() {
        let dataSeries = [
            ['a', 69],
            ['b', 59],
            ['c', 80],
            ['d', 81],
            ['e', 56],
            ['f', 55],
            ['g', 40],
            ['h', 35],
            ['i', 30],
            ['j', 55],
            ['k', 50]
        ];

        return (
            <div style={{height: '100%'}}>
                <Header />

                <div className="w3-row w3-padding-24">
                    <div className="w3-col m4 w3-center">
                        <StockChart stock='TSLA' data={dataSeries} />
                        <StockChart stock='FB' data={dataSeries} />
                    </div>

                    <div className="w3-col m4 w3-center">
                        <Portfolio />
                        <hr />
                        <NewsContainer />
                    </div>

                    <div className="w3-col m4 w3-center">
                        <StockChart stock='GOOG' data={dataSeries} />
                        <StockChart stock='AAPL' data={dataSeries} />
                    </div>

                </div>
            </div>
        )
    }
}

export default Main;
