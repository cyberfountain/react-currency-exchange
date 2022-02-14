import React from 'react'

import "../scss/Components/CurrencyInput.scss"

function CurrencyInput(props) {
    return (
        <div className='input-group currency-input'>
            <span
                className="input-group-text justify-content-center"
                data-testid="display-currency-symbol"
            >
                <span>
                    {props.currencySymbol}
                </span>
            </span>
            <input
                className='form-control'
                type="number"
                step='0.01'
                placeholder="0.00"
                ref={props.setRef}
                data-testid={props.testId}
                onChange={props.onChange}
                defaultValue={props.defaultValue}
                disabled={props.disabled}
            />
        </div>
    )
}

export default CurrencyInput;