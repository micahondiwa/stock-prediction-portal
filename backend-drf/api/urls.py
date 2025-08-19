from django.urls import path 
from accounts import views as USerViews


urlpatterns = [
    path('register/', USerViews.RegisterView.as_view()),
]