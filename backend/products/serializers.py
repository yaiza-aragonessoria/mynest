from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = '__all__'
        required_fields = ['name']
        read_only_fields = ['updated', 'home']
