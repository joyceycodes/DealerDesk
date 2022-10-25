from django.urls import path
from .views import api_customers, api_sales_persons

urlpatterns = [
    path("salespersons/", api_sales_persons, name="api_sales_persons"),
    path("customers/", api_customers, name="api_customers")
]