import React from 'react'
import Position from './Position'
import cst from '../utils/constants'


export class Portfolio extends React.Component {

    render() {
        let positions = cst.STOCKS.map(
            (sym) => {
                let position = this.props.data.positions.find((p) => p.symbol == sym) || {units: 0, price: 0};
                let currentPrice = this.props.prices[sym] || 0;
                return <Position key={sym} sym={sym} units={position.units}
                                 price={position.price} currentPrice={currentPrice}
                                 updatePosition={this.props.updatePosition} />;
            }
        );

        return (
            <div>
                <div>
                    <span className="w3-xlarge w3-left"> Cash: ${Number(this.props.data.cash).toLocaleString()}</span>
                    <button className="w3-btn w3-deep-orange w3-right"
                            onClick={this.props.resetPortfolio}> Reset Portfolio </button>
                </div>

                <br />
                <br />

                <div>
                    <table className="w3-table w3-striped w3-border w3-bordered w3-hoverable">
                        <thead>
                            <tr className="w3-teal">
                                <th>Stock</th>
                                <th>Units</th>
                                <th>Price</th>
                                <th>Gain</th>
                                <th>Buy/Sell Units</th>
                            </tr>
                        </thead>

                        <tbody>
                            {positions}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}


export default Portfolio;
