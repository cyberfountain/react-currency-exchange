import React, { useRef, useEffect } from 'react'

import { useMainState } from "../Context/MainContextProvider.jsx"
import { Round, BaseConversion, ForeignConversion } from '../Helpers/Helpers.js'
import CurrencyInput from './CurrencyInput.jsx'
import InfoInput from './InfoInput.jsx'
import BaseCurrencySelect from './BaseCurrencySelect.jsx'

import "../scss/Components/Calculator.scss"

function Calculator() {
    const { state, setState } = useMainState()

    const baseValue = useRef()
    const selectedValue = useRef()

    useEffect(() => {
        if (state?.selectedCurrency) {
            calculateSelected()
        }
    }, [setState?.selectedCurrency])

    function selectedCurrencyInfoValue() {
        if (state.selectedCurrency) {
            const curr = state.selectedCurrency
            calculateSelected()
            return `${curr.code} - ${curr.country}`

        }

        return "Select currency from the table"
    }

    function selectedCurrencySymbol() {
        if (state.selectedCurrency) {
            const m = state.currencies.find(c => c.code === state.selectedCurrency.code)
            return m ? m.symbol : ""
        }
        return ""
    }

    function baseCurrencySymbol() {
        if (state.baseCurrency) {
            const m = state.currencies.find(c => c.code === state.baseCurrency.code)
            return m ? m.symbol : ""
        }
        return ""
    }

    function calculateSelected() {
        const curr = state.selectedCurrency
        curr ? selectedValue.current.value = Round(
            BaseConversion(baseValue.current.value, state.exchangeRates[curr.code])
            , 2) : null
    }

    function calculateBase() {
        const curr = state.selectedCurrency
        baseValue.current.value = Round(
            ForeignConversion(selectedValue.current.value, state.exchangeRates[curr.code])
            , 2)
    }

    return state?.currencies ? (
        <div className='calculator'>
            <div className="row mb-4">
                <div className="col-4">
                    <CurrencyInput
                        setRef={baseValue}
                        testId="base-currency-input"
                        onChange={calculateSelected}
                        defaultValue="1.00"
                        currencySymbol={baseCurrencySymbol()}
                    />
                </div>
                <div className="col-8">
                    <div className='base-selector-container'>
                        <BaseCurrencySelect />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <CurrencyInput
                        setRef={selectedValue}
                        testId="selected-currency-input"
                        onChange={calculateBase}
                        defaultValue="0.00"
                        currencySymbol={selectedCurrencySymbol()}
                        disabled={!state.selectedCurrency}
                    />
                </div>
                <div className="col-8">
                    <InfoInput
                        value={selectedCurrencyInfoValue()}
                        testId="selected-currency-input-info"
                    />
                </div>
            </div>
        </div>
    ) : null
}

export default Calculator;