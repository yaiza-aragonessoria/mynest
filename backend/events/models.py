from datetime import date
from django.db import models
from project import settings


class Event(models.Model):
    title = models.CharField(max_length=200)
    start = models.DateField(default=date.today)
    end = models.DateField(default=date.today)
    all_day = models.BooleanField(default=False)
    notes = models.TextField(blank=True, null=True)
    creator = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='created_events')
    participants = models.ManyToManyField(to=settings.AUTH_USER_MODEL, related_name='events')

    def __str__(self):
        return f'{self.id} - {self.title}.'
