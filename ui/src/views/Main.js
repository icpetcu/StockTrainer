import React from 'react'
import Header from '../components/Header'
import NewsContainer from '../components/NewsContainer'
import Portfolio from '../components/Portfolio'
import StockChart from '../components/StockChart'
import ApiRequest from '../utils/ApiRequest'


export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            portfolio: {cash: 0, positions: []},
            news: [],
            prices: {},
            currentPrices: {
                FB: 123,
                TSLA: 80,
                GOOG: 150,
                AAPL: 100
            }
        }
    }

    componentDidMount() {
        this.fetchPortfolio();
        // stream prices
        // stream events
    }

    fetchPortfolio() {
        ApiRequest.get('portfolio', (data) => this.updatePortfolio(data))
    }

    resetPortfolio() {
        ApiRequest.post('portfolio', {action: 'reset'}, (data) => this.updatePortfolio(data))
    }

    updatePosition(sym, units, price) {
        ApiRequest.post('portfolio', {sym: sym, units: units, price: price}, (data) => this.updatePortfolio(data))
    }
    
    
    updatePortfolio(data) {
        if (typeof data === 'string') {
            this.setState({error: data});
            setTimeout(() => this.setState({error: null}), 1000);
        } else {
            // console.log(data);
            this.setState({portfolio: data})
        }
    }

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
                        <Portfolio data={this.state.portfolio}
                                   prices={this.state.currentPrices}
                                   resetPortfolio={this.resetPortfolio.bind(this)}
                                   updatePosition={this.updatePosition.bind(this)} />

                        <div className="w3-text-red w3-margin-top">
                            {this.state.error}
                        </div>
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
