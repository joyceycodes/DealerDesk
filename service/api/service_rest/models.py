from django.db import models
from django.urls import reverse

# Create your models here.
class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    import_href = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.vin

    class Meta:
        verbose_name="AutomobileVO"
        verbose_name_plural="AutomobileVOs"


class Technician(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveIntegerField(unique=True)

    def __str__(self):
        return self.name

    def get_api_url(self):
        return reverse("api_technician", kwargs={"pk": self.pk})



class ServiceAppointment(models.Model):
    vin = models.CharField(max_length=17)
    owner = models.CharField(max_length=200)
    date = models.DateField(null=True)
    time = models.TimeField(null=True)
    technician = models.ForeignKey(Technician, related_name="service_appointments", on_delete=models.PROTECT)
    reason = models.TextField()
    is_vip = models.BooleanField(default=False)
    is_done = models.BooleanField(default=False)

    def __str__(self):
        return self.vin

    def get_api_url(self):
        return reverse("api_show_service_appointment", kwargs={"pk": self.pk})
