from django.db import models


class Home(models.Model):
    name = models.TextField(default='My Nest')
    address = models.TextField(blank=True, null=True)
    # the field "cohabitants" will be added through the relationship with User
    # the field "products_set" will be added through the relationship with Products

    def __str__(self):
        return f'{self.name} with id = {self.id}'
