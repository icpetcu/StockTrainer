import React from 'react'


export class Position extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'units': 100
        }
    }

    onUnitsChange(event) {
        this.setState({units: parseInt(event.target.value)});
    }

    buyUnits() {
        this.props.updatePosition(this.props.sym, this.state.units, this.props.currentPrice);
    }

    sellUnits() {
        this.props.updatePosition(this.props.sym, -this.state.units, this.props.currentPrice);
    }

    computePnl() {
        return parseInt((this.props.currentPrice - this.props.price) * this.props.units);
    }

    render() {
        let pnl = this.computePnl();
        let dollars = pnl < 0 ? '-$' : '$';
        let pnlClass = pnl < 0 ? 'w3-text-red' : 'w3-text-green';
        return (
            <tr>
                <td> {this.props.sym} </td>
                <td> {this.props.units} </td>
                <td> {parseFloat(this.props.price).toFixed(2)} </td>
                <td className={pnlClass}> {dollars + Number(Math.abs(pnl)).toLocaleString()} </td>
                <td>
                    <input type="text" placeholder="units" maxLength="4" style={{width: '50px'}}
                           value={this.state.units} onChange={this.onUnitsChange.bind(this)} />
                    <input type="button" className="w3-btn w3-green" title="Buy"
                           style={{marginLeft: '5px'}} value="&#8679;" onClick={this.buyUnits.bind(this)} />
                    <input type="button" className="w3-btn w3-red" title="Sell"
                           style={{marginLeft: '5px'}} value="&#8681;" onClick={this.sellUnits.bind(this)} />
                </td>
            </tr>
        )
    }
}

export default Position;
