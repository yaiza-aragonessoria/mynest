from datetime import date
from django.db import modelscreated
# from homes.models import Home
from project import settings

CATEGORIES = (
    (1, 'GROCERIES'),
    (2, 'MAINTENANCE'),
    (3, 'UTILITIES'),
    (4, 'HOUSEHOLD_SUPPLIES'),
    (5, 'OTHER')
)


class Expense(models.Model):
    name = models.TextField()
    category = models.IntegerField(choices=CATEGORIES, default=5)
    amount = models.FloatField()
    bill_image = models.ImageField(max_length=255, blank=True)
    created = models.DateField(default=date.today)
    notes = models.TextField(blank=True, default='')
    creator = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='created_expenses')
    payer = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='payed_expenses')
    shared_with = models.ManyToManyField(to=settings.AUTH_USER_MODEL, related_name='expenses')

    # home = models.ForeignKey(to=Home, on_delete=models.PROTECT, related_name='expenses')

    def __str__(self):
        return f'{self.id} - {self.name} - {self.payer} paid {self.amount}CHF.'
