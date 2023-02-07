from rest_framework.permissions import BasePermission


class HasHome(BasePermission):
    def has_permission(self, request, view):
        return request.user.home is not None


class IsMemberOfHomeForProduct(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.home == obj.home
