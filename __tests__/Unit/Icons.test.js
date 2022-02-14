import React from "react"
import { cleanup, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import IconUp from "../../src/Components/Icons/IconUp.jsx"
import IconDown from "../../src/Components/Icons/IconDown.jsx"
import IconClose from "../../src/Components/Icons/IconClose.jsx"

test('should render Icon components: `IconUp`, `IconDown`, `IconClose`', () => {
    render(
        <>
            <IconUp />
            <IconDown />
            <IconClose />
        </>
    )

    const iconUp = screen.getByTestId('icon-up'),
        iconDown = screen.getByTestId('icon-down'),
        iconClose = screen.getByTestId('icon-close');

    expect(iconUp).toBeInTheDocument()
    expect(iconDown).toBeInTheDocument()
    expect(iconClose).toBeInTheDocument()

    cleanup()
})