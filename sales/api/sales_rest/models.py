from django.db import models

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

class Customer(models.Model):
    name = models.CharField(max_length=100)
    name = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=10)

    def __str__(self):
        return self.name

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
    sales_price = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.vin}"
