import requests

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from django.conf import settings

# from .models import WeatherEntry


def call_api(command, location):
    try:
        print(location)
        url = settings.API_ADDRESS + "weather?q={}&appid={}".format(location, settings.API_KEY)
        response = requests.post(url=url)
        print(response)

        return response.json()

    except Exception as exc:
        print(exc)
        return False


class WeatherView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            data = self.request.data.copy()

            location = data['location']
            command = ""

            api_call = call_api(command, location)

            print(api_call)

            response_obj = []

            return Response({'msg': response_obj}, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response({'msg': 'Exception'}, status=status.HTTP_400_BAD_REQUEST)
