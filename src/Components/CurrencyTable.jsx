import React, { useState } from 'react'

import { useMainState } from "../Context/MainContextProvider.jsx"
import SearchInput from './SearchInput.jsx'
import SortIndicator from './SortIndicator.jsx'
import { GetKey } from '../Helpers/Helpers.js'

import "../scss/Components/CurrencyTable.scss"
import TableRow from './TableRow.jsx'

function CurrencyTable() {
    const { state, setState } = useMainState()
    const [search, setSearch] = useState("")
    const [direction, setDirection] = useState(true)
    const [sortPredicate, setSortPredicate] = useState({
        column: 'country',
        type: 'string'
    })
    const [selectedRow, setSelectedRow] = useState("")

    const selectCurrency = (c) => {
        setState(prev => ({
            ...prev,
            selectedCurrency: {
                code: c.code,
                country: c.country,
                exchange: c.exchange
            }
        }))

        setSelectedRow(GetKey(c))
    }

    const handleOnSearch = value => {
        setSearch(value)
    }

    const merge = () => {
        return state.currencies.slice().map(el => {
            /**
             * This is not ideal API does not return all
             * the currency rates when requesting with
             * base currency
             *
             * This differs for diffrent currency codes
             * I assume that base currency is stripped
             * from the response in some cases :|
             */
            el.exchange = state.exchangeRates[el.code] ? state.exchangeRates[el.code] : 1
            return el
        })
    }

    const tableData = () => {
        if (state?.currencies) {
            let out = merge()

            if (search && search !== "") {
                const s = search.toLowerCase()
                out = out.filter(el => {
                    if (
                        el.country.toLowerCase().includes(s) ||
                        el.currency.toLowerCase().includes(s) ||
                        el.symbol.toLowerCase().includes(s) ||
                        el.code.toLowerCase().includes(s)
                    ) {
                        return el
                    }
                })
            }

            if (sortPredicate.type === 'string') {
                out = out.sort((a, b) => direction ?
                    a[sortPredicate.column].localeCompare(b[sortPredicate.column]) :
                    b[sortPredicate.column].localeCompare(a[sortPredicate.column])
                )
            } else {
                out = out.sort((a, b) => direction ?
                    Number(a[sortPredicate.column]) - Number(b[sortPredicate.column]) :
                    Number(b[sortPredicate.column]) - Number(a[sortPredicate.column])
                )
            }

            return out
        }

        return null
    }

    const sortTable = (predicate, type) => {
        setSortPredicate({
            column: predicate,
            type: type
        })
        setDirection(!direction)
    }

    function renderRows() {
        if (tableData()) {
            return tableData().map(c => {
                return <TableRow
                    key={GetKey(c)}
                    currency={c}
                    onClick={() => { selectCurrency(c) }}
                    selected={selectedRow === GetKey(c)}
                />
            })
        }
    }

    return state?.currencies ? (
        <div className='currency-table'>
            <SearchInput handleOnSearch={handleOnSearch} />
            <div className='scroll-container'>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th onClick={() => sortTable('country', 'string')}>
                                    <div className='d-flex justify-content-between'>
                                        <span>Country</span>
                                        <SortIndicator
                                            direction={direction}
                                            active={sortPredicate.column === "country"}
                                        />
                                    </div>
                                </th>
                                <th onClick={() => sortTable('currency', 'string')}>
                                    <div className='d-flex justify-content-between'>
                                        <span>Currency</span>
                                        <SortIndicator
                                            direction={direction}
                                            active={sortPredicate.column === "currency"}
                                        />
                                    </div>
                                </th>
                                <th onClick={() => sortTable('exchange', 'number')}>
                                    <div className='d-flex justify-content-between'>
                                        <span>Rate</span>
                                        <SortIndicator
                                            direction={direction}
                                            active={sortPredicate.column === "exchange"}
                                        />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    ) : null
}

export default CurrencyTable;