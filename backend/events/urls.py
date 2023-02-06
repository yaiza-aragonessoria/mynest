from django.urls import path

from events.views import ListCreateEventView, RetrieveUpdateDeleteEventView

urlpatterns = [
    path('', ListCreateEventView.as_view()),
    path('<int:id_event>/', RetrieveUpdateDeleteEventView.as_view()),
]
