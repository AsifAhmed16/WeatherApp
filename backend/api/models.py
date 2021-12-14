import uuid

from django.db import models


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class WeatherEntry(BaseModel):
    guid = models.UUIDField(verbose_name='GUID', unique=True)
    coord = models.JSONField()
    weather = models.JSONField()
    main = models.JSONField()
    wind = models.JSONField()
    fetched_location = models.CharField(max_length=30)
    searched_location = models.CharField(max_length=30)

    def __str__(self):
        return str(self.pk)

    def save(self, *args, **kwargs):
        if not self.guid:
            self.guid = uuid.uuid4()
        super().save(*args, **kwargs)
