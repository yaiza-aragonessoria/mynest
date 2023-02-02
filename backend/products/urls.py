from django.urls import path

from products.views import ListCreateProductView, RetrieveUpdateDeleteProductView, ListStatusView, ListSearchView

urlpatterns = [
    path('home/', ListCreateProductView.as_view()),
    path('home/status/', ListStatusView.as_view()),
    path('home/search/', ListSearchView.as_view()),
    path('<int:id_product>/', RetrieveUpdateDeleteProductView.as_view()),
]
