import React from 'react'

import IconUp from './Icons/IconUp.jsx'
import IconDown from './Icons/IconDown.jsx'

import "../scss/Components/SortIndicator.scss"

function SortIndicator(props) {
    function renderIcon() {
        if(props.direction) {
            return <IconUp />
        }

        return <IconDown />
    }

    if (props.active) {
        return <div
            className='sort-indicator d-flex align-items-center'
            data-testid="sort-indicator"
        >
            {renderIcon()}
        </div>
    }
    return <div
        className='sort-indicator d-flex align-items-center'
        data-testid="sort-indicator"
    ></div>
}

export default SortIndicator;