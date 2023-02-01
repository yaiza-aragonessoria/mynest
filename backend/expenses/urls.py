from django.urls import path
from expenses.views import RetrieveUpdateDeleteExpenseView, ListCreateExpenseView, ListHomeExpensesView

urlpatterns = [
    path('', ListCreateExpenseView.as_view()),
    path('home/', ListHomeExpensesView.as_view()),
    path('<int:id_expense>/', RetrieveUpdateDeleteExpenseView.as_view()),
]
