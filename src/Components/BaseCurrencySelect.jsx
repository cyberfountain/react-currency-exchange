import React, { useEffect, useState } from 'react'
import { useMainState } from "../Context/MainContextProvider.jsx"
import { GetKey } from '../Helpers/Helpers.js'

function BaseCurrencySelect() {
    const { state, setState } = useMainState()
    const [input, setInput] = useState({
        code: null,
        country: null
    })

    function handleOnChange(e) {
        const value = e.target.value.split('|')
        setInput({
            code: value[0],
            country: value[1]
        })
    }

    useEffect(() => {
        if (input.code) {
            fetch(`/api/v1/currency/exchange/${input.code}`, {
                headers: {
                    "accepts": "application/json"
                }
            })
                .then(r => r.json())
                .then(data => {
                    setState(prev => ({
                        ...prev,
                        baseCurrency: {
                            code: input.code,
                            country: input.country
                        },
                        exchangeRates: data
                    }))
                })
        }
    }, [input])

    function renderOptions() {
        return state.currencies.map(cc => {
            return <option
                key={GetKey(cc)}
                value={`${cc.code}|${cc.country}`}
                data-testid={`base-currency-option-${cc.code}`}
            >{cc.code} - {cc.country}</option>
        })
    }

    return (
        <select
            className="form-select"
            defaultValue={`${state.baseCurrency.code}|${state.baseCurrency.country}`}
            onChange={handleOnChange}
            data-testid="base-currency-select"
        >
            {renderOptions()}
        </select>
    )
}

export default BaseCurrencySelect;