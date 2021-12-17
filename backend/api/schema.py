import graphene
from graphene_django import DjangoObjectType
from .models import WeatherEntry


class WeatherEntryType(DjangoObjectType):
    class Meta:
        model = WeatherEntry
        fields = ('coord', 'weather', 'main', 'wind', 'fetched_location')


class Query(graphene.ObjectType):
    all_entry = graphene.List(WeatherEntryType)

    def resolve_all_entry(root, info):
        return WeatherEntry.objects.all()


schema = graphene.Schema(query=Query)
