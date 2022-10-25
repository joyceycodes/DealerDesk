from django.db import models
from django.urls import reverse
from phonenumber_field.modelfields import PhoneNumberField
# Create your models here.

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    import_href = models.CharField(max_length=200, unique=True)
    
    def __str__(self):
        return f"{self.vin}"

class SalesPerson(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
    
    def get_api_url(self):
        return reverse("api_sales_person", kwargs={"pk": self.id})


class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    phone_number = PhoneNumberField(null=False, blank=False)

    def __str__(self):
        return self.name

    def get_api_url(self):
        return reverse("api_customer", kwargs={"pk": self.id})

class SaleRecord(models.Model):
    automobile = models.ForeignKey(AutomobileVO, related_name="sale_record", on_delete=models.PROTECT)
    sales_person = models.ForeignKey(
        SalesPerson, 
        related_name="sale_record", 
        on_delete=models.PROTECT,)
    customer = models.ForeignKey(
        Customer, 
        related_name="sale_record", 
        on_delete=models.PROTECT,)
    sales_price = models.PositiveIntegerField(null=False, blank=False)

    def __str__(self):
        return f"{self.vin}"
