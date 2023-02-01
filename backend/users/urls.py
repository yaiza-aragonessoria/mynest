from django.urls import path
from users.views import ListUserView, RetrieveUserView, LoggedInUserView


urlpatterns = [
    path('', ListUserView.as_view()),
    path('<int:id_user>/', RetrieveUserView.as_view()),
    path('me/', LoggedInUserView.as_view()),
]
