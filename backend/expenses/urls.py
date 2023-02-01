from django.urls import path
from expenses.views import RetrieveUpdateDeleteExpenseView, ListCreateExpenseView

urlpatterns = [
    path('', ListCreateExpenseView.as_view()),
    # path('request/<int:id_home>/', ListCreateFriendshipView.as_view()),
    path('<int:id_expense>/', RetrieveUpdateDeleteExpenseView.as_view()),
]
