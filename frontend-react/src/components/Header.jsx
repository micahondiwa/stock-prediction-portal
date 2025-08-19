import React from 'react';
import Button from './Button';
import logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <nav className='navbar container pt-3 pb-3 d-flex justify-content-between align-items-center'>
                <div className="d-flex align-items-center">
                    <Link className='navbar-brand textlight' to={'/'}>
                        <img src={logo} alt="Logo" className="me-3" style={{ height: "200px", width: "200px" }} />
                    </Link>
                </div>
                <div>
                    <Button text='Login' class='btn-outline-info' url='/login' />
                    &nbsp;
                    <Button text='Register' class='btn-info' url='/register' />
                </div>
            </nav>
        </>
    )
}

export default Header
