from rest_framework.permissions import BasePermission


class IsMemberOfHomeForTask(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.home == obj.creator.home
