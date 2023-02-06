# Generated by Django 4.1.1 on 2023-02-03 09:28

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('expenses', '0003_alter_expense_shared_with'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expense',
            name='shared_with',
            field=models.ManyToManyField(related_name='expenses', to=settings.AUTH_USER_MODEL),
        ),
    ]