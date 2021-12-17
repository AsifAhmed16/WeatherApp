from datetime import datetime

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
                'location': '',
                'temp': '',
                'feels': '',
                'min_temp': '',
                'max_temp': '',
                'pressure': '',
                'humidity': '',
            }
            data = self.request.data.copy()
            location = data['location']

            picked_date = self.request.query_params.get('date', None)
            if picked_date is None:
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
                    'location': api_call['name'],
                    'temp': main['temp'],
                    'feels': main['feels_like'],
                    'min_temp': main['temp_min'],
                    'max_temp': main['temp_max'],
                    'pressure': main['pressure'],
                    'humidity': main['humidity'],
                }

                return Response({'response_obj': response_obj}, status=status.HTTP_201_CREATED)
            else:
                picked_date = datetime.strptime(picked_date, '%Y-%m-%d').date()
                weather_list = WeatherEntry.objects.filter(created_at__date=picked_date,
                                                          searched_location=location).order_by('-created_at')[:1]
                obj_id = list(weather_list.values_list('id', flat=True))[0]
                weather_obj = WeatherEntry.objects.get(id=obj_id)

                response_obj = {
                    'guid': weather_obj.guid,
                    'location': weather_obj.fetched_location,
                    'temp': weather_obj.main['temp'],
                    'feels': weather_obj.main['feels_like'],
                    'min_temp': weather_obj.main['temp_min'],
                    'max_temp': weather_obj.main['temp_max'],
                    'pressure': weather_obj.main['pressure'],
                    'humidity': weather_obj.main['humidity'],
                }

                return Response({'response_obj': response_obj}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            if str(e) == "time data 'null' does not match format '%Y-%m-%d'":
                err = "Pick a date."
            elif str(e) == "list index out of range":
                err = "No record were stored."
            return Response({'response_obj': default_response_obj, 'err_msg': err}, status=status.HTTP_400_BAD_REQUEST)
