import React from 'react'
import Header from '../components/Header'
import NewsContainer from '../components/NewsContainer'
import Portfolio from '../components/Portfolio'
import StockChart from '../components/StockChart'
import ApiRequest from '../utils/ApiRequest'
import ApiStream from '../utils/ApiStream'
import cst from '../utils/constants'


export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            portfolio: {cash: 0, positions: []},
            news: [],
            priceCurves: {},
            currentPrices: {}
        };
        cst.STOCKS.map((e) => {
            this.state.priceCurves[e] = [];
            this.state.currentPrices[e] = 0;
        });
    }

    componentDidMount() {
        this.fetchPortfolio();
        this.streamPrices();
        this.streamNews();
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
            this.setState({portfolio: data})
        }
    }

    streamPrices() {
        ApiStream.fetch('prices', (data) => {
            let sym = data.sym;
            let price = data.price;
            // let ts = data.ts;

            let currentPrices = this.state.currentPrices;
            currentPrices[sym] = price;

            let priceCurves = this.state.priceCurves;
            let priceCurve = priceCurves[sym];
            priceCurve.push(['', price]);
            if (priceCurve.length > 30) {
                priceCurve = priceCurve.slice(1);
            }
            priceCurves[sym] = priceCurve;

            this.setState({
                currentPrices: currentPrices,
                priceCurves: priceCurves
            })
        });
    }

    streamNews() {

    }

    render() {
        let [s1, s2, s3, s4] = cst.STOCKS;
        return (
            <div style={{height: '100%'}}>
                <Header />

                <div className="w3-row w3-padding-24">
                    <div className="w3-col m4 w3-center">
                        <StockChart stock={s1}
                                    data={this.state.priceCurves[s1]}
                                    price={this.state.currentPrices[s1]} />
                        <StockChart stock={s2}
                                    data={this.state.priceCurves[s2]}
                                    price={this.state.currentPrices[s2]} />
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
                        <StockChart stock={s3}
                                    data={this.state.priceCurves[s3]}
                                    price={this.state.currentPrices[s3]} />
                        <StockChart stock={s4}
                                    data={this.state.priceCurves[s4]}
                                    price={this.state.currentPrices[s4]} />
                    </div>

                </div>
            </div>
        )
    }
}

export default Main;
