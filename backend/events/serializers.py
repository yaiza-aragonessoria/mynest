from django.contrib.auth import get_user_model
from rest_framework import serializers
from events.models import Event
from users.serializers import UserSerializer

User = get_user_model()


class EventSerializer(serializers.ModelSerializer):
    participants = serializers.SlugRelatedField(slug_field='id', queryset=User.objects.all(), many=True)

    class Meta:
        model = Event
        fields = '__all__'
        read_only_fields = ['creator']

    # def to_representation(self, expense):
    #     representation = super().to_representation(expense)
    #     participants_queryset = User.objects.filter(id__in=representation['participants'])
    #     representation['participants'] = UserSerializer(participants_queryset, many=True).data
    #     return representation
