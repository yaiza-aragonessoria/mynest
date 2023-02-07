from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from products.permissions import HasHome
from stickers.models import Sticker
from stickers.permissions import IsMemberOfHomeForSticker
from stickers.serializers import StickerSerializer


class ListCreateStickerView(ListCreateAPIView):
    """
    get: Lists all stickers of the logged-in User's Home in inverted chronological order.

    post: Creates a new Sticker.
    """
    serializer_class = StickerSerializer
    permission_classes = [HasHome]

    def get_queryset(self):
        return Sticker.objects.filter(author__home=self.request.user.home).order_by("-updated")

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class RetrieveUpdateDeleteStickerView(RetrieveUpdateDestroyAPIView):
    """
        get: Retrieves a specific Sticker.
        patch: Updates a specific Sticker.
        delete: Deletes a Sticker.
    """
    queryset = Sticker.objects.all()
    serializer_class = StickerSerializer
    permission_classes = [IsMemberOfHomeForSticker]
    lookup_field = 'id'  # field in the database
    lookup_url_kwarg = 'id_sticker'  # field in the request
    http_method_names = ['get', 'patch', 'delete']  # disallow put as we don't use it
