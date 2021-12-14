# WeatherApp

```
A very simple application where user can search a place and through DRF, a result will be shown and keep the data in postgres database.
```


# Frontend App

```
npm install :
1. npm init react-app frontend
2. yarn add axios
Run command - npm start
URL - Local: http://localhost:3000
CREATE a .env file and put --- REACT_APP_API_URL=http://localhost:8000
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
