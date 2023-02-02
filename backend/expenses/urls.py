from django.urls import path
from expenses.views import RetrieveUpdateDeleteExpenseView, ListCreateExpenseView, ListHomeExpensesView, ExpenseResetView

urlpatterns = [
    path('', ListCreateExpenseView.as_view()),
    path('home/', ListHomeExpensesView.as_view()),
    path('home/reset/<int:id_home>/', ExpenseResetView.as_view()),
    path('<int:id_expense>/', RetrieveUpdateDeleteExpenseView.as_view()),
]
