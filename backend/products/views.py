from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView

from products.models import Product
from products.serializers import ProductSerializer
from products.permissions import HasHome, IsMemberOfHomeForProduct


class ListCreateProductView(ListCreateAPIView):
    """
    get: Lists all products of the logged-in User's Home in inverted chronological order.

    post: Creates a new Product.
    """
    serializer_class = ProductSerializer
    permission_classes = [HasHome]

    def get_queryset(self):
        return Product.objects.filter(home=self.request.user.home).order_by("-updated")

    def perform_create(self, serializer):
        serializer.save(home=self.request.user.home)


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
    get: Lists all products of the logged-in User's Home with a given status in inverted chronological order.
         Set status in the parameter "q". Valid statuses are: TB, IP, BO.
    """
    serializer_class = ProductSerializer
    permission_classes = [HasHome]

    def get_queryset(self):
        return Product.objects.filter(
            home=self.request.user.home, status=self.request.GET.get('q', '')).order_by("-updated")


class ListSearchView(ListAPIView):
    """
     get: Lists all products of the logged-in User's Home with a name containing the parameter "q" in
          inverted chronological order.
     """
    serializer_class = ProductSerializer
    permission_classes = [HasHome]

    def get_queryset(self):
        return Product.objects.filter(
            home=self.request.user.home, name__contains=self.request.GET.get('q', '')).order_by("-updated")
