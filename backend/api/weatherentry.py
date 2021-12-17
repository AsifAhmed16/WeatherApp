
class WeatherEntry:

    def __init__(self):
        self.numbers = {}

    def add(self, location, numbers):
        self.numbers[location] = numbers

    def lookup(self, location):
        return self.numbers[location]
