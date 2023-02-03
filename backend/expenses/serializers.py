from django.contrib.auth import get_user_model
from rest_framework import serializers
from expenses.models import Expense

User = get_user_model()


class ExpenseSerializer(serializers.ModelSerializer):
    shared_with = serializers.SlugRelatedField(slug_field='id', queryset=User.objects.all(), many=True)

    class Meta:
        model = Expense
        fields = ['shared_with', 'name', 'amount', 'category', 'payer']
        read_only_fields = ['creator']
