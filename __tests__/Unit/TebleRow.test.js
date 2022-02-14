import React from "react"
import { cleanup, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import { currencyObjectGBP } from "../../__mocks__/currencyObjectMock"
import TableRow from "../../src/Components/TableRow.jsx"
import { GetKey } from "../../src/Helpers/Helpers"

test('should render TableRow component', () => {
    render(<table>
        <tbody>
            <TableRow
                key={GetKey(currencyObjectGBP)}
                currency={currencyObjectGBP}
                onClick={jest.fn()}
                selected={false}
            />
        </tbody>
    </table>)

    const flag = screen.getByTestId('table-column-flag'),
        country = screen.getByTestId('table-column-country'),
        currency = screen.getByTestId('table-column-currency'),
        exchange = screen.getByTestId('table-column-exchange'),
        row = screen.getByTestId('table-row')

    expect(row).toBeInTheDocument()
    expect(flag).toBeInTheDocument()
    expect(flag.firstChild).toHaveClass('flag-icon-gb')
    expect(country).toBeInTheDocument()
    expect(country).toHaveTextContent('United Kingdom')
    expect(currency).toBeInTheDocument()
    expect(currency).toHaveTextContent('Sterling')
    expect(currency).toHaveTextContent('£')
    expect(exchange).toBeInTheDocument()
    expect(exchange).toHaveTextContent('4.980')

    cleanup()
})

test('should render TableRow component selected when value for selected prop set to: `true`', () => {
    render(<table>
        <tbody>
            <TableRow
                key={GetKey(currencyObjectGBP)}
                currency={currencyObjectGBP}
                onClick={jest.fn()}
                selected={true}
            />
        </tbody>
    </table>)

    const row = screen.getByTestId('table-row')
    expect(row).toHaveClass('active')
    cleanup()
})