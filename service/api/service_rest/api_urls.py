from django.urls import path
from .views import api_list_service_appointments, api_list_technicians, api_show_service_appointments


urlpatterns = [
    path("serviceappointments/", api_list_service_appointments, name="api_list_service_appointments"),
    path("technicians/", api_list_technicians, name="api_list_technicians"),
    path("searchVIN/", api_show_service_appointments, name="api_search_VIN"),
]
