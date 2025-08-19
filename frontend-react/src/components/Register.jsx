import React from 'react'

function Register() {
    return (
        <>
            <div className='container'>
                <div className='row justify-content-center' >
                    <div className='col-md-6 bg-light-dark p-5 rounded' >
                        <h3 className='text-light text-center mb-4' >Create an Account </h3>
                        <form>
                            <input type='text' className='form-control mb-3' placeholder='Enter Username' />
                            <input type='email' className='form-control mb-3' placeholder='Enter Email Address' />
                            <input type='password' className='form-control mb-5' placeholder='Set Password' />
                            <button type='submit' className='btn btn-info d-block mx-auto'>Register</button>
                        </form>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Register