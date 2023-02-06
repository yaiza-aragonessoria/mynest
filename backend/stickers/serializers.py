from rest_framework import serializers
from .models import Sticker


class StickerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sticker
        fields = '__all__'
        required_fields = ['content']
        read_only_fields = ['created', 'updated', 'author']
