from django.contrib.auth import get_user_model
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from expenses.models import Expense
from expenses.serializers import ExpenseSerializer

User = get_user_model()


class ListCreateExpenseView(ListCreateAPIView):
    """
        get:
        Lists all Expenses.
    """
    serializer_class = ExpenseSerializer

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

    def get_queryset(self):
        query = self.request.GET.get('search', '')  # search is the params and '' the default value
        queryset = Expense.objects.filter(name__contains=query).order_by('-created')
        return queryset


class RetrieveUpdateDeleteExpenseView(RetrieveUpdateDestroyAPIView):
    """
        get:
        Retrieves a specific Expense by ID and displays all the information about it.

        patch:
        Updates the status of a specific Expense.

        delete:
        Deletes a Expense by ID.

    """
    http_method_names = ['get', 'patch', 'delete']  # disallow put as we don't use it
    lookup_field = 'id'
    lookup_url_kwarg = 'id_expense'
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    # permission_classes = [IsAuthenticated, IsInvolvedInFriendship | IsAdminUser]
