import React, { useRef, useState } from 'react'
import IconClose from './Icons/IconClose.jsx'
import "../scss/Components/SearchInput.scss"

function SearchInput(props) {
    const [state, setState] = useState("")
    const inputValue = useRef()

    function handleOnInput(e) {
        const value = e.target.value
        setState(value)
        props.handleOnSearch(value)
    }

    function clearSearch() {
        setState("")
        inputValue.current.value = ""
        props.handleOnSearch("")
    }

    const displayClearButton = () => {
        if (state && state !== "") {
            return <div
                className="clear-search"
                onClick={clearSearch}
                data-testid="currency-input-search-clear-button"
            >
                <IconClose />
            </div>
        }
    }

    return (
        <div className='search-input'>
            {displayClearButton()}
            <div className="mb-4">
                <input
                    className="search-input form-control"
                    type="text"
                    placeholder="Search..."
                    data-testid="currency-input-search"
                    onInput={handleOnInput}
                    ref={inputValue}
                />
            </div>
        </div>
    )
}

export default SearchInput;