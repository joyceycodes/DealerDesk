from django.urls import path
from .views import api_list_service_appointments, api_list_technicians, api_show_service_appointment


urlpatterns = [
    path("serviceappointments/", api_list_service_appointments, name="api_list_service_appointments"),
    path("technicians/", api_list_technicians, name="api_list_technicians"),
    path("searchVIN/", api_list_service_appointments, name="api_search_VIN"),
    path("servicesappointments/<int:pk>", api_show_service_appointment, name="api_show_service_appointment"),
]
