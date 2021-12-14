import requests

from django.conf import settings


def call_api(location):
    try:
        url = settings.API_ADDRESS + "weather?q={}&appid={}".format(location, settings.API_KEY)
        response = requests.post(url=url)
        return response.json()

    except Exception as exc:
        print(exc)
        return False
