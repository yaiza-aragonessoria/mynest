from django.urls import path

from tasks.views import ListCreateTaskView, RetrieveUpdateDeleteTaskView, ListSearchView, ListMonthTaskView

urlpatterns = [
    path('home/', ListCreateTaskView.as_view()),
    path('home/month/', ListMonthTaskView.as_view()),
    path('home/search/', ListSearchView.as_view()),
    path('<int:id_task>/', RetrieveUpdateDeleteTaskView.as_view()),
]
