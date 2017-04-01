import React from 'react'


export class Position extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'units': 100
        }
    }

    onUnitsChange(event) {
        this.setState({units: event.target.value});
    }

    render() {
        return (
            <tr>
                <td> {this.props.name} </td>
                <td>2,500</td>
                <td>143.54</td>
                <td>$1,500</td>
                <td>
                    <input type="text" placeholder="units" maxLength="4" style={{width: '50px'}}
                           value={this.state.units} onChange={this.onUnitsChange.bind(this)} />
                    <input type="button" className="w3-btn w3-green" title="Buy"
                           style={{marginLeft: '5px'}} value="&#8679;" />
                    <input type="button" className="w3-btn w3-red" title="Sell"
                           style={{marginLeft: '5px'}} value="&#8681;" />
                </td>
            </tr>
        )
    }
}

export default Position;
