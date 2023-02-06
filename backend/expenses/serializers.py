from django.contrib.auth import get_user_model
from rest_framework import serializers
from expenses.models import Expense
from users.serializers import UserSerializer

User = get_user_model()


class ExpenseSerializer(serializers.ModelSerializer):
    shared_with = serializers.SlugRelatedField(slug_field='id', queryset=User.objects.all(), many=True)

    class Meta:
        model = Expense
        fields = '__all__'
        read_only_fields = ['creator']

    def to_representation(self, expense):
        representation = super().to_representation(expense)
        shared_with_queryset = User.objects.filter(id__in=representation['shared_with'])
        representation['shared_with'] = UserSerializer(shared_with_queryset, many=True).data
        return representation
