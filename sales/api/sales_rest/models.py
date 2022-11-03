from email.policy import default
from django.db import models
from django.urls import reverse
from phonenumber_field.modelfields import PhoneNumberField
# Create your models here.

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    import_href = models.CharField(max_length=200, unique=True)
    is_sold = models.BooleanField(default=False,null=False)

    def __str__(self):
        return f"{self.vin}"

    def get_api_url(self):
        return reverse("api_automobile_VO", kwargs={"pk": self.id})

class SalesPerson(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveSmallIntegerField(unique=True)

    def get_sales_total(self):
        employee_sales = SaleRecord.objects.filter(sales_person=self.employee_number)
        sales_total = 0
        for sale in employee_sales:
            sales_total += sale["sales_price"]
            return sales_total
    
    def get_sold_count(self):
        return SaleRecord.objects.filter(sales_person=self.id).count()
        
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
    automobile = models.OneToOneField(
        AutomobileVO, 
        related_name="sale_record", 
        on_delete=models.PROTECT)
    sales_person = models.ForeignKey(
        SalesPerson, 
        related_name="sale_record", 
        on_delete=models.PROTECT,)
    customer = models.ForeignKey(
        Customer, 
        related_name="sale_record", 
        on_delete=models.PROTECT,)
    sales_price = models.DecimalField(max_digits=15, decimal_places=2)

    def __str__(self):
        return f"{self.automobile}"

    def get_api_url(self):
        return reverse("api_sale_record", kwargs={"pk": self.id})