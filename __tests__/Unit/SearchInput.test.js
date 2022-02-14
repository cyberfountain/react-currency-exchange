import React from "react"
import { cleanup, render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import SearchInput from "../../src/Components/SearchInput.jsx"

afterEach(() => {
    cleanup()
})

test('should render SearchInput component', () => {
    render(<SearchInput handleOnSearch={jest.fn()} />)

    const input = screen.getByTestId('currency-input-search')
    expect(input).toBeInTheDocument()
})

test('should set input value to: `test` and display `clear button`', () => {
    render(<SearchInput handleOnSearch={jest.fn()} />)

    const input = screen.getByTestId('currency-input-search')
    userEvent.type(input, 'test')
    expect(input).toHaveValue('test')

    const clearButton = screen.getByTestId('currency-input-search-clear-button')
    expect(clearButton).toBeInTheDocument()
})

test('should hide `clear button` after setting input value to: ``', () => {
    render(<SearchInput handleOnSearch={jest.fn()} />)

    const input = screen.getByTestId('currency-input-search')
    userEvent.clear(input)
    expect(input).toHaveValue('')
    expect(screen.queryByTestId('currency-input-search-clear-button')).toBeNull()
})

test('should clear input when clicking `clear button`', () => {
    render(<SearchInput handleOnSearch={jest.fn()} />)

    const input = screen.getByTestId('currency-input-search')
    userEvent.type(input, 'kasjkasjdkalsjdkadls')

    const clearButton = screen.getByTestId('currency-input-search-clear-button')
    userEvent.click(clearButton)

    expect(screen.queryByTestId('currency-input-search-clear-button')).toBeNull()
    expect(input).toHaveValue('')
})