import React from 'react'

const Header = () => {
    return (
        <>
            <nav className='navbar container pt-3 pb-3'>
                <a className='navbar-brand text-light' href="">Stock Prediction Portal</a>

                <div>
                    <a className='btn btn-outline-info' href=''>Login</a>
                    &nbsp;
                    <a className='btn btn-info' href=''>Login</a>
                </div>
            </nav>
        </>
    )
}

export default Header