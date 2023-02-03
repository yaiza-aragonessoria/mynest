from django.urls import path

from homes.views import RetrieveUpdateDeleteHomeView

urlpatterns = [
    path('', RetrieveUpdateDeleteHomeView.as_view()),
]
