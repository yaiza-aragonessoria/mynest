from rest_framework import serializers

from expenses.models import Expense
from users.models import User


def compute_member_balance(id_member, id_home):
    home_expenses = Expense.objects.filter(creator_id__home=id_home)

    member_balance = 0
    for expense in home_expenses:
        id_expense = expense.id
        shared_with = Expense.objects.filter(id=id_expense).values('shared_with')
        num_members_sharing = len(shared_with)
        amount = Expense.objects.filter(id=id_expense).values('amount')[0].get('amount', None)
        payer = Expense.objects.filter(id=id_expense).values('payer')[0].get('payer', None)

        # is member involved in this expense?
        for member in shared_with:
            if id_member == member.get('shared_with', None):
                is_member_in_expense = 1
                break
            else:
                is_member_in_expense = 0

        to_pay = is_member_in_expense * amount / num_members_sharing

        # has member paid?
        if id_member == payer:
            is_member_payer = 1
        else:
            is_member_payer = 0

        paid = is_member_payer * amount

        member_balance = member_balance + (paid - to_pay)

    return member_balance



class UserSerializer(serializers.ModelSerializer):
    balance = serializers.SerializerMethodField()

    def get_balance(self, user):
        # user=logged-in user, memeber=users sharing logged-in-user (including logged-in user)
        id_home = user.home
        home_members = User.objects.filter(home=id_home)

        # compute balance of all members
        member_balances = []
        for member in home_members:
            id_member = member.id
            member_balance = compute_member_balance(id_member, id_home)
            member_balances.append([member.id, member_balance])

        return member_balances

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
