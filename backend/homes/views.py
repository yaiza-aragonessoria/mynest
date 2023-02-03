from rest_framework.generics import RetrieveUpdateDestroyAPIView

from homes.models import Home
from homes.serializers import HomeSerializer
from products.permissions import HasHome


class RetrieveUpdateDeleteHomeView(RetrieveUpdateDestroyAPIView):
    """
        get: Retrieves a specific Home.
        patch: Updates a specific Home.
        delete: Deletes a Home.
    """
    serializer_class = HomeSerializer
    permission_classes = [HasHome]
    http_method_names = ['get', 'patch', 'delete']  # disallow put as we don't use it

    def get_object(self):
        return Home.objects.get(id=self.request.user.home.id)
