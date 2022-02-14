import React from 'react'

function InfoInput(props) {
    return (
        <input
            className='form-control'
            disabled
            type="text"
            value={props.value}
            data-testid={props.testId}
        />
    )
}

export default InfoInput;