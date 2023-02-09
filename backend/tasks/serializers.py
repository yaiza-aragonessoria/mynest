from rest_framework import serializers

import users.serializers
from .models import Task


class AssigneeSerializer(serializers.Serializer):
    first_name = serializers.CharField(read_only=True)
    last_name = serializers.CharField(read_only=True)
    avatar = serializers.ImageField(read_only=True)


class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ['created', 'updated', 'creator']

    def to_representation(self, instance):
            data = super().to_representation(instance)
            data["assignee"] = AssigneeSerializer(instance.assignee).data
            return data


class TaskCreationSerializer(serializers.Serializer):
    name = serializers.CharField(required=True)
    frequency = serializers.IntegerField(required=True)
    planned_for = serializers.DateField(required=False)

    def validate_frequency(self, value):
        if value < 1:
            raise serializers.ValidationError("Frequency must be at least 1")
        return value
