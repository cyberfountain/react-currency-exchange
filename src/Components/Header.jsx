import React from 'react'

import "../scss/Components/Header.scss"
import reactlogo from '../assets/img/react-icon.svg'

function Header() {
    return (
        <header className='d-flex justify-content-center align-items-center'>
            <img className='logo' src={reactlogo} alt="Exchange Rates" data-testid="logo-image" />
            <h1>Currency Exchange</h1>
        </header>
    )
}

export default Header;