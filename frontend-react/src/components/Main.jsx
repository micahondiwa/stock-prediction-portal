import React from 'react'
import Button from './Button'
import Header from './Header'
import Footer from './Footer'

const Main = () => {
    return (
        <>
            <div className='container'>
                <div className='p-5 text-center bg-light-dark rounded'>
                    <h1 className='text-light'>Stock Prediction with LSTM</h1>
                    <p className='text-light lead'>Welcome to your LSTM-powered companion for stock price prediction. Built on a robust Django REST Framework backend and a sleek React dashboard, the platform ingests historical market data and uses Long Short-Term Memory (LSTM) neural networks to learn temporal patterns in prices and volumes. With a few clicks, you can choose a ticker, visualize its history, and generate forward forecasts complete with error bands—all in real time. Whether you’re just getting started or you trade daily, this focused LSTM approach delivers clear, data-driven predictions through an intuitive interface to help you act with confidence.</p>
                    <Button text="Explore" class='btn-outline-info' url="/dashboard" />
                </div>
            </div>
        </>
    )
}

export default Main