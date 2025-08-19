import React from 'react'
import Button from './Button'
import logo from '../assets/images/logo.png'

const Header = () => {
    return (
        <>
            <nav className='navbar container pt-3 pb-3 d-flex justify-content-between align-items-center'>
                <div className="d-flex align-items-center">
                    <img
                        src={logo}
                        alt="Stock Prediction Logo"
                        className="me-3"
                        style={{ height: "200px", width: "200px" }}
                    />
                </div>
                <div>
                    <Button text='Login' class='btn-outline-info' />
                    &nbsp;
                    <Button text='Register' class='btn-info' />
                </div>
            </nav>
        </>
    )
}

export default Header
