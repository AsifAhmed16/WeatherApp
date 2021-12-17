from graphene_django.views import GraphQLView

from django.urls import path

from .schema import schema
from .views import WeatherView

app_name = 'api'

urlpatterns = [
    path('weather/', WeatherView.as_view(), name='weather'),
    path('weather/graphql', GraphQLView.as_view(graphiql=True, schema=schema)),
]
