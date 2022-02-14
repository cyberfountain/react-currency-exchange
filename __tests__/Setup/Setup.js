import React from "react"
import { render } from "@testing-library/react"
import { MainStateProvider } from "../../src/Context/MainContextProvider.jsx"
import fetchMock from "jest-fetch-mock"
import { act } from 'react-dom/test-utils'
import "core-js/stable";
import "regenerator-runtime/runtime"

fetchMock.enableMocks()

global.renderWithContext = async (children, data) => {
    return act(async () => render(
        <MainStateProvider value={data}>
            {children}
        </MainStateProvider>
    ))
}