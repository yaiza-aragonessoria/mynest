# Generated by Django 4.1.1 on 2023-02-09 09:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('expenses', '0004_alter_expense_shared_with'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expense',
            name='bill_image',
            field=models.ImageField(blank=True, max_length=255, null=True, upload_to=''),
        ),
    ]
