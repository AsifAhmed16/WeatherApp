import unittest

from weatherentry import WeatherEntry


class WeatherEntryTest(unittest.TestCase):

    def test_lookup_by_location(self):
        weather_entry = WeatherEntry()
        weather_entry.add('dhaka', "123")
        number = weather_entry.lookup('dhaka')
        self.assertEqual("123", number)
