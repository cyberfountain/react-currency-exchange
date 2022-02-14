import React from "react"
import { cleanup, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import SortIndicator from "../../src/Components/SortIndicator.jsx"

test('should render SortIndicator component with no Icons when active set to: `false`', () => {
    render(<SortIndicator active={false} direction={true} />)
    const el = screen.getByTestId('sort-indicator')
    expect(el).toBeInTheDocument()
    expect(screen.queryByTestId('icon-up')).toBeNull()
    expect(screen.queryByTestId('icon-down')).toBeNull()
    cleanup()
})

test('should render SortIndicator component with IconUp when active and direction set to: `true`', () => {
    render(<SortIndicator active={true} direction={true} />)
    const icon = screen.getByTestId('icon-up')
    expect(icon).toBeInTheDocument()
    cleanup()
})

test('should render SortIndicator component with IconDown when active and direction set to: `false`', () => {
    render(<SortIndicator active={true} direction={false} />)
    const icon = screen.getByTestId('icon-down')
    expect(icon).toBeInTheDocument()
    cleanup()
})