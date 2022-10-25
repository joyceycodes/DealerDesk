from django.urls import path
from .views import api_list_service_appointments, api_list_technicians


urlpatterns = [
    path("serviceappointments/", api_list_service_appointments, name="api_list_service_appointments"),
    path("technicians/", api_list_technicians, name="api_list_technicians"),
]
