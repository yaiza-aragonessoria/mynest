from django.urls import path

from stickers.views import ListCreateStickerView, RetrieveUpdateDeleteStickerView

urlpatterns = [
    path('home/', ListCreateStickerView.as_view()),
    path('<int:id_sticker>/', RetrieveUpdateDeleteStickerView.as_view()),
]
