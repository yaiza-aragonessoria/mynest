from django.db import models


class Home(models.Model):
    name = models.TextField(default='My Nest')
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return f'{self.name} with id = {self.id}'
