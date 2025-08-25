from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import StockPredictionSerializers

# Create your views here.
class StockPredictionAPIView(APIView):
    def post(self, request):
        serializer = 