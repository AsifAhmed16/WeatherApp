from django.urls import path
from .views import WeatherView

app_name = 'api'

urlpatterns = [
    path('weather/', WeatherView.as_view(), name='weather'),
]
