import React from 'react'
import Position from './Position'


export class Portfolio extends React.Component {

    render() {
        let positions = ['FB', 'GOOG', 'TSLA', 'AAPL'].map(
            (e) => <Position key={e} name={e} />
        );

        return (
            <div>
                <div>
                    <span className="w3-xlarge w3-left"> Cash: $1,000,000</span>
                    <button className="w3-btn w3-deep-orange w3-right"> Reset Portfolio </button>
                </div>

                <br />
                <br />

                <div>
                    <table className="w3-table w3-striped w3-border w3-bordered w3-hoverable">
                        <thead>
                            <tr className="w3-blue">
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

                <div className="w3-text-red w3-margin-top">
                    Error be here!
                </div>
            </div>
        )
    }
}


export default Portfolio;
