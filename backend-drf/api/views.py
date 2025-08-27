from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import yfinance as yf
from datetime import datetime
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error
from keras.models import load_model

from .serializers import StockPredictionSerializer
from .utils import save_plot


class StockPredictionAPIView(APIView):
    def post(self, request):
        serializer = StockPredictionSerializer(data=request.data)
        if serializer.is_valid():
            ticker = serializer.validated_data['ticker']

            # Fetch data from yfinance
            now = datetime.now()
            start = datetime(now.year - 10, now.month, now.day)
            end = now
            df = yf.download(ticker, start, end)

            if df.empty:
                return Response(
                    {"error": "No data found for the given ticker."},
                    status=status.HTTP_404_NOT_FOUND,
                )

            df = df.reset_index()

            # --- Basic Closing Price Plot ---
            plt.switch_backend("AGG")
            plt.figure(figsize=(12, 5))
            plt.plot(df.Close)
            plt.xlabel("Days")
            plt.ylabel("Close Price")
            plt.title(f"Closing Price of {ticker}")
            plot_img_path = f"{ticker}_plot.png"
            plot_img = save_plot(plot_img_path)

            # --- 100 Day Moving Average ---
            ma100 = df.Close.rolling(100).mean()
            plt.figure(figsize=(12, 5))
            plt.plot(df.Close, "b", label="Closing Price")
            plt.plot(ma100, "r", label="100 Days MA")
            plt.title(f"100 Days MA of {ticker}")
            plt.xlabel("Days")
            plt.ylabel("Close Price")
            plt.legend()
            plot_img_path = f"{ticker}_100_dma_plot.png"
            plot_100_dma = save_plot(plot_img_path)

            # --- 200 Day Moving Average ---
            ma200 = df.Close.rolling(200).mean()
            plt.figure(figsize=(12, 5))
            plt.plot(df.Close, "b", label="Closing Price")
            plt.plot(ma100, "r", label="100 Days MA")
            plt.plot(ma200, "g", label="200 Days MA")
            plt.title(f"200 Days MA of {ticker}")
            plt.xlabel("Days")
            plt.ylabel("Close Price")
            plt.legend()
            plot_img_path = f"{ticker}_200_dma_plot.png"
            plot_200_dma = save_plot(plot_img_path)

            # --- Split data ---
            data_training = pd.DataFrame(df.Close[0 : int(len(df) * 0.70)])
            data_testing = pd.DataFrame(df.Close[int(len(df) * 0.70) : int(len(df))])

            scaler = MinMaxScaler(feature_range=(0, 1))

            # --- Load trained model ---
            model = load_model("keras_model.keras")

            # --- Preparing test data ---
            past_100_days = data_training.tail(100)
            final_df = pd.concat([past_100_days, data_testing], ignore_index=True)
            input_data = scaler.fit_transform(final_df)

            x_test, y_test = [], []
            for i in range(100, input_data.shape[0]):
                x_test.append(input_data[i - 100 : i])
                y_test.append(input_data[i, 0])

            x_test, y_test = np.array(x_test), np.array(y_test)

            # --- Predictions ---
            y_predicted = model.predict(x_test)

            # Revert Predictions to original prices
            y_predicted = scaler.inverse_transform(
                y_predicted.reshape(-1, 1)
            ).flatten()
            y_test = scaler.inverse_transform(y_test.reshape(-1, 1)).flatten()

            # --- Final prediction plot ---
            plt.figure(figsize=(12, 5))
            plt.plot(y_test, "b", label="Original Price")
            plt.plot(y_predicted, "r", label="Predicted Price")
            plt.xlabel("Time")
            plt.ylabel("Price")
            plt.legend()
            plot_img_path = f"{ticker}_final_prediction.png"
            plot_prediction = save_plot(plot_img_path)

            # --- Model Evaluation ---
            mse = mean_squared_error(y_test, y_predicted)
            rmse = np.sqrt(mse)
            mae = np.mean(np.abs(y_test - y_predicted))
            ssr = np.sum((y_test - y_predicted) ** 2)
            sst = np.sum((y_test - np.mean(y_test)) ** 2)
            r_squared = 1 - (ssr / sst)

            return Response(
                {
                    "status": "success",
                    "plot_img": plot_img,
                    "plot_100_dma": plot_100_dma,
                    "plot_200_dma": plot_200_dma,
                    "plot_prediction": plot_prediction,
                    "mse": mse,
                    "rmse": rmse,
                    "mae": mae,
                    "r2": r_squared,
                },
                status=status.HTTP_200_OK,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
