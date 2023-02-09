from rest_framework import serializers
from .models import Sticker


class UserStickerSerializer(serializers.Serializer):
    first_name = serializers.CharField(read_only=True)
    last_name = serializers.CharField(read_only=True)
    avatar = serializers.ImageField(read_only=True)


class StickerSerializer(serializers.ModelSerializer):

    author = UserStickerSerializer(read_only=True)

    class Meta:
        model = Sticker
        fields = '__all__'
        required_fields = ['content']
        read_only_fields = ['created', 'updated']
