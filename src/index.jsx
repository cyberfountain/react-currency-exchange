import ReactDOM from 'react-dom'
import React from 'react'

import App from "./Components/App.jsx"
import { MainStateProvider } from "./Context/MainContextProvider.jsx"

import "./scss/base.scss"

const defaultState = {
    baseCurrency: {
        code: "GBP",
        country: "United Kingdom"
    },
    selectedCurrency: null
}

ReactDOM.render(
    <MainStateProvider value={defaultState}>
        <App></App>
    </MainStateProvider>,
    document.getElementById('app'),
)