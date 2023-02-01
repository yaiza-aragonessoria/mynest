from django.urls import path

from products.views import ListCreateProductView, RetrieveUpdateDeleteProductView, ListStatusView, ListSearchView

urlpatterns = [
    path('home/<int:id_home>/', ListCreateProductView.as_view()),
    path('<int:id_product>/', RetrieveUpdateDeleteProductView.as_view()),
    path('home/<int:id_home>/status/', ListStatusView.as_view()),
    path('home/<int:id_home>/search/', ListSearchView.as_view()),
]
