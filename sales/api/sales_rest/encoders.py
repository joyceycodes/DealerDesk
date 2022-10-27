from common.json import ModelEncoder


from .models import Customer, SalesPerson, SaleRecord, AutomobileVO

class SalesPersonListEncoder(ModelEncoder):
    model= SalesPerson
    properties = [
        "name",
        "employee_number"
    ]

class CustomerListEncoder(ModelEncoder):
    model= Customer
    properties = [
        "name",
        "address",
        "phone_number",
        "id"
    ]

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin", 
        "import_href",
        "is_sold"
    ]

class SaleRecordListEncoder(ModelEncoder):
    model= SaleRecord
    properties = [
        "sales_price",
        "sales_person",
        "customer",
        "automobile"
    ]
    encoders= {
        "sales_person": SalesPersonListEncoder(),
        "customer": CustomerListEncoder(),
        "automobile": AutomobileVOEncoder(),
    }