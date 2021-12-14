from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

# from .serializers import WeatherEntrySerializer
from .models import WeatherEntry
from .service import call_api


class WeatherView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            default_response_obj = {
                'guid': 1,
                'temp': '',
                'feels': '',
                'min_temp': '',
                'max_temp': '',
                'pressure': '',
                'humidity': '',
            }
            data = self.request.data.copy()
            location = data['location']

            api_call = call_api(location)
            main = api_call['main']

            weather_obj = WeatherEntry.objects.create(coord=api_call['coord'],
                                                      weather=api_call['weather'],
                                                      main=api_call['main'],
                                                      wind=api_call['wind'],
                                                      fetched_location=api_call['name'],
                                                      searched_location=location)

            response_obj = {
                'guid': weather_obj.guid,
                'temp': main['temp'],
                'feels': main['feels_like'],
                'min_temp': main['temp_min'],
                'max_temp': main['temp_max'],
                'pressure': main['pressure'],
                'humidity': main['humidity'],
            }

            return Response({'response_obj': response_obj}, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response({'response_obj': default_response_obj}, status=status.HTTP_400_BAD_REQUEST)
