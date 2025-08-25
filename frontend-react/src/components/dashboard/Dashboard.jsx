import axios from 'axios';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';

const Dashboard = () => {
    const [ticker, setTicker] = useState('');
    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                const response = await axiosInstance.get('/protected-view')
                console.log('Success', response.data)
            } catch (error) {
                console.log('Error fetching data', error)
            }
        }
        fetchProtectedData();
    }, [])
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6'>
                    <form>
                        <input type='text' className='form-control' placeholder='Enter Stock Ticker' />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;