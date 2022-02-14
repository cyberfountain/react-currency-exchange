import React from "react"
import { cleanup, render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

import CurrencyInput from "../../src/Components/CurrencyInput.jsx"

test('should render `CurrencyInput` component', () => {
    render(<CurrencyInput
        testId="currency-input"
        onChange={jest.fn()}
        defaultValue="1.00"
        currencySymbol="$"
    />)

    const input = screen.getByTestId('currency-input')
    const currencySymbol = screen.getByTestId('display-currency-symbol')

    expect(input).toBeInTheDocument()
    expect(currencySymbol).toBeInTheDocument()

    expect(input).toHaveValue(1)
    expect(currencySymbol).toHaveTextContent('$')

    cleanup()
})

test('should set input value', () => {
    render(<CurrencyInput
        testId="currency-input"
        onChange={jest.fn()}
        defaultValue="1.00"
        currencySymbol="$"
    />)

    const input = screen.getByTestId('currency-input')

    userEvent.clear(input)
    userEvent.type(input, '2')
    expect(input).toHaveValue(2)

    userEvent.clear(input)
    userEvent.type(input, '2.5')
    expect(input).toHaveValue(2.5)

    cleanup()
})