from rest_framework import serializers
from .models import Sticker


class UserSerializer(serializers.Serializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()


class StickerSerializer(serializers.ModelSerializer):

    author = UserSerializer()

    class Meta:
        model = Sticker
        fields = '__all__'
        required_fields = ['content']
        read_only_fields = ['created', 'updated', 'author']
