from django.contrib.auth import get_user_model
from rest_framework import serializers
from events.models import Event

User = get_user_model()


class EventSerializer(serializers.ModelSerializer):
    participants = serializers.SlugRelatedField(slug_field='id', queryset=User.objects.all(), many=True)

    class Meta:
        model = Event
        fields = '__all__'
        read_only_fields = ['creator']
