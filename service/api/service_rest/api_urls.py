from django.urls import path
from .views import api_list_service_appointments, api_list_technicians, api_show_service_appointment, api_list_automobileVOs


urlpatterns = [
    path("serviceappointments/", api_list_service_appointments, name="api_list_service_appointments"),
    path("technicians/", api_list_technicians, name="api_list_technicians"),
    path("servicesappointments/<int:pk>", api_show_service_appointment, name="api_show_service_appointment"),
    path("automobileVOs/", api_list_automobileVOs, name="api_show_automobileVOs"),
]
