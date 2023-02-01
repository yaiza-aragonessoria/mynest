from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView

from homes.models import Home
from products.models import Product
from products.serializers import ProductSerializer
from products.permissions import IsMemberOfHome, IsMemberOfHomeForProduct


class ListCreateProductView(ListCreateAPIView):
    """
    get: Lists all products of Home in inverted chronological order.

    post: Creates a new Product.
    """
    serializer_class = ProductSerializer
    permission_classes = [IsMemberOfHome]

    def get_queryset(self):
        return Product.objects.filter(home=self.kwargs['id_home']).order_by("-updated")

    def perform_create(self, serializer):
        h = Home.objects.get(id=self.kwargs['id_home'])
        serializer.save(home=h)


class RetrieveUpdateDeleteProductView(RetrieveUpdateDestroyAPIView):
    """
        get: Retrieves a specific Product.
        patch: Updates a specific Product.
        delete: Deletes a Product.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsMemberOfHomeForProduct]
    lookup_field = 'id'  # field in the database
    lookup_url_kwarg = 'id_product'  # field in the request
    http_method_names = ['get', 'patch', 'delete']  # disallow put as we don't use it


class ListStatusView(ListAPIView):
    """
    get: Lists all products of Home with a given status in inverted chronological order.
         Set status in the parameter "q". Valid statuses are: TB, IP, BO.
    """
    serializer_class = ProductSerializer
    permission_classes = [IsMemberOfHome]

    def get_queryset(self):
        return Product.objects.filter(
            home=self.kwargs['id_home'], status=self.request.GET.get('q', '')).order_by("-updated")


class ListSearchView(ListAPIView):
    """
     get: Lists all products of Home with a name containing the parameter "q" in inverted chronological order.
     """
    serializer_class = ProductSerializer
    permission_classes = [IsMemberOfHome]

    def get_queryset(self):
        return Product.objects.filter(
            home=self.kwargs['id_home'], name__contains=self.request.GET.get('q', '')).order_by("-updated")
