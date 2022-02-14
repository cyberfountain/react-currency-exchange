import React from "react"
import { cleanup, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import InfoInput from "../../src/Components/InfoInput.jsx"

test('should render `InfoInput` component', () => {
    render(<InfoInput
        value="GBP - United Kingdom"
        testId="info-input"
    />)

    const input = screen.getByTestId('info-input')
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue('GBP - United Kingdom')
    expect(input).toBeDisabled()

    cleanup()
})