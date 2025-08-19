import React, { useState } from "react";
import axios from 'axios';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleRegistration = async (e) => {
        e.preventDefault();
        const userData = { username, email, password };

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/register/', userData);
            console.log('response.data==>', response.data);
            console.log('Registration Successful');
            setErrors({});
        } catch (error) {
            if (error.response) {
                setErrors(error.response.data);
                console.error('Registration error: ', error.response.data);
            } else if (error.request) {
                console.error("No response from server:", error.request);
                setErrors({ general: "No response from server. Please try again later." });
            } else {
                console.error("Unexpected error:", error.message);
                setErrors({ general: "Unexpected error: " + error.message });
            }
        }
    };

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-md-6 bg-light-dark p-5 rounded'>
                    <h3 className='text-light text-center mb-4'>Create an Account</h3>

                    {errors.general && <div className="alert alert-danger">{errors.general}</div>}

                    <form onSubmit={handleRegistration}>
                        <div className="mb-3">
                            <input
                                type='text'
                                className='form-control mb-1'
                                placeholder='Enter Username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            {errors.username && <small className='text-danger'>{errors.username}</small>}
                        </div>
                        <div className="mb-3">
                            <input
                                type='email'
                                className='form-control mb-1'
                                placeholder='Enter Email Address'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <small className='text-danger'>{errors.email}</small>}
                        </div>
                        <div className="mb-5">
                            <input
                                type='password'
                                className='form-control mb-3'
                                placeholder='Set Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && <small className='text-danger'>{errors.password}</small>}
                        </div>
                        <button type='submit' className='btn btn-info d-block mx-auto mt-3'>Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
