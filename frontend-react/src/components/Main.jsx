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
                    <p className='text-light lead'>Welcome to the LSTM-powered stock prediction portal. Designed with a Django REST Framework backend and a sleek React dashboard, the application leverages Long Short-Term Memory (LSTM) neural networks to analyze historical stock data and uncover temporal patterns in price movements.</p>
                    <p className='text-light lead'>The portal focuses on predicting the previous 30% of the data against a test set from that same segment, rather than forecasting the next day, week, or month. Since stock prices are highly volatile and influenced by countless external factors, this controlled approach evaluates the model’s accuracy using known past values instead of uncertain future prices. By doing so, the system demonstrates the reliability of its predictions while minimizing the risks of misleading forecasts.</p>
                    <p className='text-light lead'> With its clear visualizations and interactive design, the portal makes it easy to explore historical performance, assess predictive accuracy, and gain valuable insights into stock trends.</p>
                    <Button text="Explore" class='btn-outline-info' url="/dashboard" />
                </div>
            </div>
        </>
    )
}

export default Main