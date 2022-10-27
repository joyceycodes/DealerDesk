from django.urls import path
from .views import api_automobile_VOs, api_customers, api_sales_persons, api_sales_records

urlpatterns = [
    path("salespersons/", api_sales_persons, name="api_sales_persons"),
    path("customers/", api_customers, name="api_customers"),
    path("salesrecords/", api_sales_records, name="api_sales_records"),
    path("automobileVOs/", api_automobile_VOs, name="api_automobile_VOs")
]