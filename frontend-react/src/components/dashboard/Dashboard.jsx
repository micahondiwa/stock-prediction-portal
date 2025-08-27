import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
    const [ticker, setTicker] = useState('');
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [plot, setPlot] = useState();
    const [ma100, setMa100] = useState();
    const [ma200, setMa200] = useState();
    const [mse, setMse] = useState();
    const [rmse, setRmse] = useState();
    const [r2, setR2] = useState();
    const [prediction, setPrediction] = useState();

    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                await axiosInstance.get('/protected-view');
            } catch (error) {
                console.log('Error fetching data', error);
            }
        };
        fetchProtectedData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosInstance.post('/predict/', { ticker });
            const backendRoot = import.meta.env.VITE_BACKEND_ROOT;

            setPlot(`${backendRoot}${response.data.plot_img}`);
            setMa100(`${backendRoot}${response.data.plot_100_dma}`);
            setMa200(`${backendRoot}${response.data.plot_200_dma}`);
            setMse(response.data.mse);
            setRmse(response.data.rmse);
            setR2(response.data.r2);
            setPrediction(true);

            if (response.data.error) {
                setError(response.data.error)
            };

        } catch (error) {
            console.error('There was an error making the API request', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Stock Ticker"
                            onChange={(e) => setTicker(e.target.value)}
                            required
                        />
                        <small>{error && <div className="text-danger">{error}</div>}</small>


                        <button type="submit" className="btn btn-info mt-3 w-100">
                            {loading ? (
                                <span>
                                    <FontAwesomeIcon icon={faSpinner} spin /> Please wait...
                                </span>
                            ) : (
                                'See Prediction'
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Print Prediction Plots */}
            {prediction && (
                <div className="prediction mt-5">
                    <div className="row g-4">
                        {plot && (
                            <div className="col-md-4">
                                <div className="card shadow-sm">
                                    <div className="card-body text-center">
                                        <img src={plot} alt="Stock Plot"
                                            className="img-fluid rounded" />
                                        <p className="mt-2 fw-bold">Stock Price Trend</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        {ma100 && (
                            <div className="col-md-4">
                                <div className="card shadow-sm">
                                    <div className="card-body text-center">
                                        <img src={ma100} alt="100 DMA"
                                            className="img-fluid rounded" />
                                        <p className="mt-2 fw-bold">100-Day Moving Avg</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        {ma200 && (
                            <div className="col-md-4">
                                <div className="card shadow-sm">
                                    <div className="card-body text-center">
                                        <img src={ma200} alt="200 DMA"
                                            className="img-fluid rounded" />
                                        <p className="mt-2 fw-bold">200-Day Moving Avg</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="card bg-dark text-light mt-5 shadow">
                        <div className="card-body">
                            <h4 className="mb-3">Model Evaluation</h4>
                            <p><strong>Mean Squared Error (MSE):</strong> {mse}</p>
                            <p><strong>Root Mean Squared Error (RMSE):</strong> {rmse}</p>
                            <p><strong>R-Squared:</strong> {r2}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
