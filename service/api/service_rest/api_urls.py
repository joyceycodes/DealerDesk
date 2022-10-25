from django.urls import path
from .views import api_list_service_appointments


urlpatterns = [
    path("serviceappointments/", api_list_service_appointments, name="api_list_service_appointments")
]
