from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ['created', 'updated', 'creator']


class TaskCreationSerializer(serializers.Serializer):

    name = serializers.CharField(required=True)
    frequency = serializers.IntegerField(required=True)
    planned_for = serializers.DateField(required=False)

    def validate_frequency(self, value):
        if value < 1:
            raise serializers.ValidationError("Frequency must be at least 1")
        return value
