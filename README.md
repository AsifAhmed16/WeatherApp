
# WeatherApp

```
A very simple application where user can search a place and through DRF, a result will be shown and keep the data in postgres database using OpenWeatherMapAPI.

1. put a city name in search box and hit search button to display weather data. 
2. The search record will be stored in database.
3. User can get weather history by picking a date. (Some sample data will be shown by loading - weather_entry.json file in api app using django fixture, city name by - dhaka and tokyo will be auto inserted through docker-compose.yml)

```

```
TECHNOLOGIES USED ::::

● Python, Django and Django Rest Framework
● React.js
● PostgreSQL
● Docker
● Fixtures

```

```
AMONG THINGS LIKE TO SEE ::::

● Search by city name
● GraphQL
● Responsive CSS
● Unit Tests
● Easy setup/deployment

```


# Frontend App

```
npm install :
1. npm init react-app frontend
2. yarn add axios
Run command - npm start
URL - Local: http://localhost:3000
CREATE a .env file and put --- REACT_APP_API_URL=http://localhost:8000

---------------------------------------------------------------------------

Docker Run:
docker-compose build
docker-compose up
```

# Backend App

```
Run command - python manage.py runserver
URL - Local: http://localhost:8000
```

# Step 1: DB Create

```
Create a database - 'weather_app_db'
sudo -i -u postgres
psql
CREATE DATABASE weather_app_db;
```

# Step 2: Requirements.txt file for installing dependencies

```
pip freeze > requirements.txt
pip install requirements.txt
```

# Step 3: Migration

```
python manage.py makemigrations
python manage.py migrate

```


# Step 1 + Step 2 + Step 3: Combined as Docker

```

docker-compose build
docker-compose up
# commands.txt file is used to up and publish docker with database

```


# Additional Features

```

# GraphQL

rest-api (localhost) : http://localhost:8000/api/weather/graphql

demo-object : 
{
  allEntry{
    coord,
    weather,
    main,
    wind,
    fetchedLocation
  }
}

# Unit test
python -m unittest 

# Fixture
python manage.py dumpdata api.weatherentry > api/fixtures/weather_entry.json
python manage.py loaddata weather_entry


```
