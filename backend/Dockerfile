FROM python:3

ENV PYTHONUNBUFFERED 1

# RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev

WORKDIR /django

COPY requirements.txt /django/

RUN pip install -r requirements.txt

COPY . /django/
