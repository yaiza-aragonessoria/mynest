from rest_framework import serializers

from expenses.models import Expense
from users.models import User


class UserSerializer(serializers.ModelSerializer):
    balance = serializers.SerializerMethodField()

    def get_balance(self, user):
        id_user = user.id
        id_home = user.home
        home_members = User.objects.filter(home=id_home)
        home_id_expenses = Expense.objects.filter(creator_id__home=id_home).values('id')
        num_expenses = len(home_id_expenses)

        total = 0
        for i, id_expense in enumerate(home_id_expenses):
            id = id_expense['id']
            shared_with = Expense.objects.filter(id=id).values('shared_with')
            num_members_sharing = len(shared_with)
            amount = Expense.objects.filter(id=id).values('amount')[0].get('amount', None)
            payer = Expense.objects.filter(id=id).values('payer')[0].get('payer', None)
            # amount = amount_query[0].get('amount', None)

            # is user involved in this expense?
            for member in shared_with:
                if id_user == member.get('shared_with', None):
                    is_user_in_expense = 1
                    break
                else:
                    is_user_in_expense = 0

            to_pay = is_user_in_expense * amount / num_members_sharing

            # has user paid?
            if id_user == payer:
                is_user_payer = 1
            else:
                is_user_payer = 0

            paid = is_user_payer * amount

            total = total + (paid - to_pay)

        return total

    class Meta:
        model = User
        fields = ['id',
                  'email',
                  'first_name',
                  'last_name',
                  'avatar',
                  'home',
                  'created_expenses',
                  'expenses',
                  'payed_expenses',
                  'balance']
