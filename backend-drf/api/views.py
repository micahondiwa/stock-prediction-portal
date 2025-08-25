from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import StockPredictionSerializer

# Create your views here.
class StockPredictionAPIView(APIView):
    def post(self, request):
        serializer = StockPredictionSerializer