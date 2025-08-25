from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import StockPredictionSerializer
from rest_framework import status
from rest_framework.response import Response

import numpy as np 
import pandas as pd 
import matplotlib.pyplot as plt 
import yfinance as yf 
from datetime import datetime
from sklearn.preprocessing import MinMaxScaler
from keras.layers import Dense, LSTM, Input 
from keras.models import Sequential

# Create your views here.
class StockPredictionAPIView(APIView):
    def post(self, request):
        serializer = StockPredictionSerializer(data=request.data)
        if serializer.is_valid():
            ticker = serializer.validated_data['ticker']

            # Fetch data from yfinance
            now = datetime.now()
            start = datetime(now.year-10, now.month, now.day)
            end  = now 
            ticker = 'AAPL'
            df = yf.download(ticker, start, end)
            if df.empty:
                return Response({'error': 'No data found for the given ticker.'
                                 'status': status.HTTP_404_NOT_FOUND})
            return Response({'status': 'success', 'ticker': ticker})