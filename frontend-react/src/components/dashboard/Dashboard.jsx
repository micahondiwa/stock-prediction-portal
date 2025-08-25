import axios from 'axios';
import React, { useEffect } from 'react';
import axiosInstance from '../../axiosInstance';

const Dashboard = () => {
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

        </div>
    )
}

export default Dashboard;