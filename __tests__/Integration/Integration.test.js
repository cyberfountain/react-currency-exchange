import React from "react"
import { cleanup, screen } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import { stateMockInitial } from "../../__mocks__/stateMocks"
import { httpExchangeBaseUSD, initialRequest } from "../../__mocks__/httpMocks"
import { act } from 'react-dom/test-utils'
import App from "../../src/Components/App.jsx"
import userEvent from "@testing-library/user-event"

test('should render App and trigger feetch initial request: `/api/v1/currency', async () => {
    fetch.resetMocks()
    fetch.mockResponse(
        JSON.stringify(initialRequest)
    )

    await renderWithContext(<App></App>, stateMockInitial)

    expect(fetch).toHaveBeenCalledTimes(1)

    expect(screen.getByTestId('currency-input-search')).toBeInTheDocument()
    expect(screen.getAllByTestId('table-row').length).toBe(2)
    expect(screen.getAllByTestId('sort-indicator').length).toBe(3)
    expect(screen.getByTestId('base-currency-input')).toBeInTheDocument()
    expect(screen.getByTestId('selected-currency-input')).toBeInTheDocument()
    expect(screen.getByTestId('base-currency-select')).toBeInTheDocument()
    expect(screen.getByTestId('selected-currency-input-info')).toBeInTheDocument()
})

test('should select `USD` currency', () => {
    const rows = screen.getAllByTestId('table-row')
    userEvent.click(rows[1])
    expect(rows[1]).toHaveClass('active')
    expect(screen.getByTestId('selected-currency-input')).toHaveValue(1.36)
    expect(screen.getByTestId('selected-currency-input-info')).toHaveValue('USD - United States')
})

test('should filter table rows', () => {
    const search = screen.getByTestId('currency-input-search')
    userEvent.type(search, 'GBP')
    const rows = screen.getAllByTestId('table-row')
    expect(rows.length).toBe(1)
})

test('should be able to sort table by clicking table heading', () => {
    const search = screen.getByTestId('currency-input-search')
    userEvent.clear(search)
    const indicators = screen.getAllByTestId('sort-indicator')
    userEvent.click(indicators[0])
    let rows = screen.getAllByTestId('table-row')
    expect(rows[0]).toHaveTextContent('United States')

    userEvent.click(indicators[0])
    rows = screen.getAllByTestId('table-row')
    expect(rows[0]).toHaveTextContent('United Kingdom')
})

test('should be able to change base currency to `USD`', async () => {
    const rows = screen.getAllByTestId('table-row')
    userEvent.click(rows[0])

    expect(screen.getByTestId('selected-currency-input-info')).toHaveValue('GBP - United Kingdom')

    fetch.resetMocks()
    fetch.mockResponse(
        JSON.stringify(httpExchangeBaseUSD)
    )

    const select = screen.getByTestId('base-currency-select')
    await act(async () => userEvent.selectOptions(select, [screen.getByTestId('base-currency-option-USD')]))
    expect(screen.getByTestId('base-currency-option-USD').selected).toBeTruthy()
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(screen.getByTestId('selected-currency-input')).toHaveValue(0.97)

    cleanup()
})