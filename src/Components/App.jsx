import React, { useEffect } from 'react'
import { useMainState } from "../Context/MainContextProvider.jsx"
import CurrencyTable from './CurrencyTable.jsx'
import Header from './Header.jsx'
import Calculator from './Calcultaor.jsx'

function App() {
    const { state, setState } = useMainState()

    useEffect(() => {
        fetch(`/api/v1/currency`, {
            headers: {
                "accepts": "application/json"
            }
        })
            .then(r => r.json())
            .then(data => {
                setState(prev => ({
                    ...prev,
                    ...data,
                }))
            })
    }, [])

    return (<div className='container'>
        <Header />
        <div className='custom-card'>
            <Calculator />
            <CurrencyTable />
        </div>
    </div >)
}

export default App
