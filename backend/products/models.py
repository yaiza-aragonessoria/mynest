from django.db import models

from homes.models import Home


class Product(models.Model):
    STATUS_TO_BUY = 'TB'
    STATUS_IN_PROGRESS = 'IP'
    STATUS_BOUGHT = 'BO'
    STATUS_CHOICES = [
        (STATUS_TO_BUY, 'to buy'),
        (STATUS_IN_PROGRESS, 'in progress'),
        (STATUS_BOUGHT, 'bought'),
    ]

    name = models.CharField(max_length=50, blank=False)
    quantity = models.IntegerField(default=1)
    status = models.CharField(max_length=2, choices=STATUS_CHOICES, default=STATUS_TO_BUY)
    favorite = models.BooleanField(default=False)
    updated = models.DateTimeField(auto_now=True)
    home = models.ForeignKey(Home, on_delete=models.CASCADE)

    def __str__(self):
        return f'Product {self.id}: {self.name}'
