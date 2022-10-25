from django.contrib import admin

from .models import AutomobileVO, SaleRecord, SalesPerson, Customer

# Register your models here.
admin.site.register(Customer)
admin.site.register(SalesPerson)
admin.site.register(SaleRecord)
admin.site.register(AutomobileVO)
