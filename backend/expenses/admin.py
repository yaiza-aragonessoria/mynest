from django.contrib import admin
from expenses.models import Expense


class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'amount', 'creator', 'payer', 'show_shared_with')
    def show_shared_with(self, obj):
        return ", ".join([user.email for user in obj.shared_with.all()])


admin.site.register(Expense, ExpenseAdmin)