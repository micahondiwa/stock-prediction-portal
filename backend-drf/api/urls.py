from django.urls import path 
from accounts import views as USerViews
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', USerViews.RegisterView.as_view()),
]