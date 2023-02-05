from datetime import date
from django.db import models
from users.models import User


class Task(models.Model):
    STATUS_TODO = 'TD'
    STATUS_IN_PROGRESS = 'IP'
    STATUS_DONE = 'DO'
    STATUS_CHOICES = [
        (STATUS_TODO, 'todo'),
        (STATUS_IN_PROGRESS, 'in progress'),
        (STATUS_DONE, 'done'),
    ]

    name = models.CharField(max_length=50, blank=False, unique=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=2, choices=STATUS_CHOICES, default=STATUS_TODO)
    active = models.BooleanField(default=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_tasks')
    assignee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks', blank=True, null=True)
    # By default set to today's date, but we can change it on creation or edit it with PATCH.
    planned_for = models.DateField(default=date.today)

    def __str__(self):
        return f'Task {self.id}: {self.name}'
