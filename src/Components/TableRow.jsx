import React from 'react'

import { Round } from "../Helpers/Helpers"

function TableRow(props) {
    return (
        <tr
            onClick={props.onClick}
            className={props.selected ? 'active' : ''}
            data-testid="table-row"
        >
            <td className='text-center align-middle' data-testid="table-column-flag">
                <span className={`flag-icon flag-icon-${props.currency.countryCode.toLowerCase()}`}></span>
            </td>
            <td className='align-middle' data-testid="table-column-country">
                {props.currency.country}
            </td>
            <td data-testid="table-column-currency">
                <div>{props.currency.currency}</div>
                <small>
                    <strong>Symbol: </strong>
                    {props.currency.symbol}
                </small>
            </td>
            <td className='align-middle' data-testid="table-column-exchange">
                {Round(props.currency.exchange, 3)}
            </td>
        </tr>
    )
}

export default TableRow;
