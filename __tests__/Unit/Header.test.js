import React from "react"
import { cleanup, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'

import Header from "../../src/Components/Header.jsx"

test('should render Header component', () => {
    render(<Header />)

    expect(screen.getByText('Currency Exchange')).toBeInTheDocument()
    expect(screen.getByTestId('logo-image')).toBeInTheDocument()

    cleanup()
})
