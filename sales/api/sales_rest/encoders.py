from common.json import ModelEncoder

from .models import Customer, SalesPerson, SaleRecord

class SalesPersonEncoder(ModelEncoder):
    model= SalesPerson
    properties = [
        "name",
        "employee_number"
    ]

class CustomerEncoder(ModelEncoder):
    model= Customer
    properties = [
        "name",
        "address",
        "phone_number"
    ]


class SaleRecordEncoder(ModelEncoder):
    model= SaleRecord
    properties = [
        "price",
    ]
