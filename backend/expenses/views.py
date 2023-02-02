from django.contrib.auth import get_user_model
from django.db import IntegrityError
from django.http import HttpResponse
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView, ListAPIView, GenericAPIView
from expenses.models import Expense
from expenses.serializers import ExpenseSerializer
from users.serializers import compute_home_balance

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


class ListHomeExpensesView(ListAPIView):
    """
        get:
        Lists all Expenses of the Home of the logged-in User ordered by date.
    """

    serializer_class = ExpenseSerializer

    def get_queryset(self):
        id_home = self.request.user.home
        if id_home:
            query = self.request.GET.get('search', '')  # search is the params and '' the default value
            queryset = Expense.objects.filter(creator_id__home=id_home, name__contains=query).order_by('-created')
        else:
            queryset = []
        return queryset


class ExpenseResetView(GenericAPIView):
    """
    post:
     Settles up all balances of Home with id_home.
    """
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

    # permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            id_home = kwargs.get('id_home')
            home_balance = compute_home_balance(id_home)
            # home_members = User.objects.filter(home=id_home)

            owing_members = []
            lending_members = []

            for [member, balance] in home_balance:
                if balance < 0:
                    owing_members.append([member, balance])
                elif balance > 0:
                    lending_members.append([member, balance])
                else:
                    continue

            if len(owing_members) > 1:
                owing_members = sorted(owing_members, key=lambda x: x[1])
            if len(lending_members) > 1:
                lending_members = sorted(lending_members, key=lambda x: -x[1])

            i = 0
            j = 0
            while i < len(owing_members) and j < len(lending_members):
                [owing_member, owed_amount] = owing_members[i]
                [lending_member, lent_amount] = lending_members[j]
                rest = owed_amount + lent_amount
                if rest == 0:
                    if lent_amount > 0.01:
                        print(f'{owing_member} gives {round(lent_amount, 2)} to {lending_member}')
                    i += 1
                    j += 1
                elif rest > 0:  # lent_amount is bigger
                    if -owed_amount > 0.01:
                        print(f'{owing_member} gives {round(-owed_amount, 2)} to {lending_member}')
                    lending_members[j][1] = owed_amount + lent_amount
                    i += 1
                else:  # owed_amount is bigger
                    if lent_amount > 0.01:
                        print(f'{owing_member} gives {round(lent_amount, 2)} to {lending_member}')
                    owing_members[i][1] = owed_amount + lent_amount
                    j += 1

            # requester = request.user
            # requester_name = request.user.username
            # receiver = User.objects.get(id=kwargs.get('user_id'))
            # friendship, created = requester.add_friendship(receiver, 1)
            # if created:
            #     return HttpResponse(friendship, status=201)
            # else:
            #     return HttpResponse("Friendship already exists", status=400)
            return HttpResponse("", status=204)
        except (IntegrityError, User.DoesNotExist) as e:
            if 'UNIQUE constraint failed' in e.args[0]:
                return HttpResponse("Friendship already exists", status=400)
            return HttpResponse(status=400)
