from django.urls import path

from events.views import ListCreateEventView, RetrieveUpdateDeleteEventView, ListHomeEventsView

urlpatterns = [
    path('', ListCreateEventView.as_view()),
    path('<int:id_event>/', RetrieveUpdateDeleteEventView.as_view()),
    path('home/', ListHomeEventsView.as_view()),
]
