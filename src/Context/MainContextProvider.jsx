import React, { createContext, useState, useContext } from "react"

const MainStateContext = createContext({
    state: {},
    setState: {},
});

const MainStateProvider = ({
    children,
    value
}) => {
    const [state, setState] = useState(value);
    return (
        <MainStateContext.Provider value={{ state, setState }}>
            {children}
        </MainStateContext.Provider>
    )
}

const useMainState = () => {
    const context = useContext(MainStateContext)
    if (!context) {
        throw new Error("useMainState must be used within a MainStateContext")
    }
    return context
}

export { MainStateProvider, useMainState }