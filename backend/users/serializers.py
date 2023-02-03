from rest_framework import serializers

from expenses.models import Expense
from users.models import User


def compute_expense_balance(id_expense, id_home):
    home_members = User.objects.filter(home=id_home)
    expense = Expense.objects.get(id=id_expense)

    expense_balance = []
    for member in home_members:
        id_member = member.id
        shared_with = Expense.objects.filter(id=id_expense).values('shared_with')
        num_members_sharing = len(shared_with)
        amount = Expense.objects.filter(id=id_expense).values('amount')[0].get('amount', None)
        payer = Expense.objects.filter(id=id_expense).values('payer')[0].get('payer', None)

        # is member involved in this expense?
        for involved_member in shared_with:
            if id_member == involved_member.get('shared_with', None):
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

        expense_balance.append([id_member, round(paid - to_pay, 2)])

    # check the one cent problem
    check = 0
    for [member, amount] in expense_balance:
        check = check + amount

    if check > 0:
        for member_balance in expense_balance:
            if member_balance[1] <= 0:
                member_balance[1] = member_balance[1] - round(check, 2)
                break
    elif check < 0:
        for member_balance in expense_balance:
            if member_balance[1] <= 0:
                member_balance[1] = member_balance[1] + round(-check, 2)
                break

    return expense_balance


def compute_home_balance(id_home):
    home_members = User.objects.filter(home=id_home)
    home_expenses = Expense.objects.filter(creator_id__home=id_home)

    # compute balance of each expense and sum them up
    total_balance = [[member.id, 0] for member in home_members]
    for expense in home_expenses:
        id_expense = expense.id
        expense_balance = compute_expense_balance(id_expense, id_home)

        i=0
        for i, [member, amount] in enumerate(expense_balance):
            total_balance[i][1] = round(total_balance[i][1] + amount, 2)

    return total_balance

def compute_member_balance_old(id_member, id_home):
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


def compute_home_balance_old(id_home):
    home_members = User.objects.filter(home=id_home)

    # compute balance of all members
    member_balances = []
    for member in home_members:
        id_member = member.id
        member_balance = compute_member_balance(id_member, id_home)
        member_balances.append([member.id, round(member_balance, 2)])

    # check the one cent problem
    check = 0
    for [member, amount] in member_balances:
        check = check + amount

    if check > 0:
        for member_balance in member_balances:
            if member_balance[1] <= 0:
                member_balance[1] = member_balance[1] - 0.01
                break
    elif check > 0:
        for member_balance in member_balances:
            if member_balance[1] <= 0:
                member_balance[1] = member_balance[1] + 0.01
                break

    return member_balances


class UserSerializer(serializers.ModelSerializer):
    home_balance = serializers.SerializerMethodField()

    def get_home_balance(self, user):
        # user=logged-in user, member=users sharing logged-in-user (including logged-in user)
        id_home = user.home

        if not id_home:
            return 'User has no home'

        return compute_home_balance(id_home)

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
                  'home_balance']
