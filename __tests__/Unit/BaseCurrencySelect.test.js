import React from "react"
import { cleanup, screen } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { stateMockBaseGBP, stateMockBaseUSD } from "../../__mocks__/stateMocks"
import { httpExchangeBaseUSD, httpExchangeBaseGBP } from "../../__mocks__/httpMocks"
import BaseCurrencySelect from "../../src/Components/BaseCurrencySelect.jsx"

afterEach(() => {
    cleanup()
})

test('should render BaseCurrencySelect component', async () => {
    await renderWithContext(<BaseCurrencySelect />, stateMockBaseGBP)

    const select = screen.getByTestId('base-currency-select')
    const options = screen.getAllByTestId(/base-currency-option-*/)

    expect(select).toBeInTheDocument()
    expect(options.length).toBe(2)

    options.forEach(o => {
        expect(o).toBeInTheDocument()
    })
})

test('should have base currency `GBP` selected on initial render', async () => {
    await renderWithContext(<BaseCurrencySelect />, stateMockBaseGBP)
    const select = screen.getByTestId('base-currency-select')
    expect(select).toHaveValue('GBP|United Kingdom')
})

test('should have base currency `USD` selected on initial render', async () => {
    await renderWithContext(<BaseCurrencySelect />, stateMockBaseUSD)
    const select = screen.getByTestId('base-currency-select')
    expect(select).toHaveValue('USD|United States')
})

test('should be able to select `USD` base currency and trigger feetch request for exchange rate: `/api/v1/currency/exchange/USD`', async () => {
    await renderWithContext(<BaseCurrencySelect />, stateMockBaseGBP)

    fetch.resetMocks()
    fetch.mockResponse(
        JSON.stringify(httpExchangeBaseUSD)
    )

    const select = screen.getByTestId('base-currency-select')
    await act(async () => userEvent.selectOptions(select, [screen.getByTestId('base-currency-option-USD')]))
    expect(screen.getByTestId('base-currency-option-USD').selected).toBeTruthy()
    expect(fetch).toHaveBeenCalledTimes(1)
})

test('should be able to select `GBP` base currency and trigger feetch request for exchange rate: `/api/v1/currency/exchange/GBP`', async () => {
    await renderWithContext(<BaseCurrencySelect />, stateMockBaseUSD)

    fetch.resetMocks()
    fetch.mockResponse(
        JSON.stringify(httpExchangeBaseGBP)
    )

    const select = screen.getByTestId('base-currency-select')
    await act(async () => userEvent.selectOptions(select, [screen.getByTestId('base-currency-option-GBP')]))
    expect(screen.getByTestId('base-currency-option-GBP').selected).toBeTruthy()
    expect(fetch).toHaveBeenCalledTimes(1)
})