from rest_framework.permissions import BasePermission


class IsMemberOfHome(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.home == request.kwargs['id_home']


class IsMemberOfHomeForProduct(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.home == obj.home
