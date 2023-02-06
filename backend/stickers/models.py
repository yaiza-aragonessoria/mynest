from django.db import models
from users.models import User


class Sticker(models.Model):
    content = models.TextField(blank=False, null=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    pinned = models.BooleanField(default=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='stickers')

    def __str__(self):
        return f'{self.content} with id = {self.id}'
