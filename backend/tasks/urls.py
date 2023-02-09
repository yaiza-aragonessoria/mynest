from django.urls import path

from tasks.views import ListCreateTaskView, RetrieveUpdateDeleteTaskView, ListSearchAllTaskView, ListSearchMonthTaskView

urlpatterns = [
    path('home/', ListCreateTaskView.as_view()),
    path('home/search-all/', ListSearchAllTaskView.as_view()),
    path('home/search-month/', ListSearchMonthTaskView.as_view()),
    path('<int:id_task>/', RetrieveUpdateDeleteTaskView.as_view()),
]
