from common.json import ModelEncoder

from .models import Customer, SalesPerson, SaleRecord

class SalesPersonEncoder(ModelEncoder):
    model= SalesPerson
    properties = [
        "name",
        "employee_number"
    ]