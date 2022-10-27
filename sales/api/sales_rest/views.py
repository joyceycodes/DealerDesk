from django.shortcuts import render
from django.http import JsonResponse
from .models import AutomobileVO, SaleRecord, SalesPerson, Customer
from .encoders import AutomobileVOEncoder, SaleRecordListEncoder, SalesPersonListEncoder, CustomerListEncoder
import json
from django.views.decorators.http import require_http_methods
# Create your views here.



@require_http_methods(["GET", "POST"])
def api_sales_persons(request):
    if request.method == "GET":
        sales_persons = SalesPerson.objects.all()
        return JsonResponse(
            {"sales_persons": sales_persons}, 
            encoder=SalesPersonListEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            sales_person = SalesPerson.objects.create(**content)
            return JsonResponse(
                sales_person,
                encoder=SalesPersonListEncoder,
                safe=False
            )
        except: 
            response = JsonResponse(
                {"message": "Could not create the sales person"}
            )
            response.status_code = 400
            return response



@require_http_methods(["GET", "POST"])
def api_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers}, 
            encoder=CustomerListEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerListEncoder,
                safe=False
            )
        except: 
            response = JsonResponse(
                {"message": "Could not create the customer"}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET", "POST"])
def api_sales_records(request):
    if request.method == "GET":
        sales_records = SaleRecord.objects.all()
        return JsonResponse(
            {"sales_records": sales_records}, 
            encoder=SaleRecordListEncoder
        )
    else:
        try:
            content = json.loads(request.body)

            automobile_vin = content["automobile"]
            AutomobileVO.objects.filter(vin=automobile_vin).update(is_sold=True)
            automobile = AutomobileVO.objects.get(vin=automobile_vin)
            content["automobile"] = automobile

            sales_person_employee_number= content["sales_person"]
            sales_person = SalesPerson.objects.get(employee_number=sales_person_employee_number)
            content["sales_person"] = sales_person

            customer_id = content["customer"]
            customer = Customer.objects.get(id=customer_id)
            content["customer"] = customer


            sale_record = SaleRecord.objects.create(**content)
            return JsonResponse(
                sale_record,
                encoder=SaleRecordListEncoder,
                safe=False
            )
        except: 
            response = JsonResponse(
                {"message": "Could not create the sale record"}
            )
            response.status_code = 400
            return response

# @require_http_methods(["PUT"])
# def api_automobile_VO(request, vin):
#     AutomobileVO.objects.filter(vin=vin).update(is_sold=True)
#     auto = AutomobileVO.objects.get(vin=vin)
#     return JsonResponse(auto, encoder=AutomobileVOEncoder, safe=False)

@require_http_methods(["GET"])
def api_automobile_VOs(request):
    autos = AutomobileVO.objects.all()
    return JsonResponse({"autos": autos}, encoder=AutomobileVOEncoder, safe=False)