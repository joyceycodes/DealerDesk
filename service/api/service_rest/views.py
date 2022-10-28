from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import AutomobileVO, Technician, ServiceAppointment

# Create your views here.


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "import_href"]


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = ["name", "employee_number", "id"]


class ServiceAppointmentEncoder(ModelEncoder):
    model = ServiceAppointment
    properties = [
        "vin",
        "owner",
        "date",
        "time",
        "reason",
        "technician",
        "is_vip",
        "is_done",
        "id",
    ]

    encoders= {
        "technician": TechnicianEncoder()
    }



@ require_http_methods(["GET", "POST"])
def api_list_service_appointments(request):
    if request.method == "GET":
        appointments = ServiceAppointment.objects.all()
        return JsonResponse(
            {"service_appointments": appointments},
            encoder = ServiceAppointmentEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            technician= Technician.objects.get(name=content["technician"])
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Technician is not in system"},
                status=400,
            )
        try:
            AutomobileVO.objects.get(vin=content["vin"])
            content["is_vip"] = True
        except AutomobileVO.DoesNotExist:
            content["is_vip"]=False


        appointment = ServiceAppointment.objects.create(**content)
        return JsonResponse (
            appointment,
            encoder=ServiceAppointmentEncoder,
            safe=False,
        )



@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_service_appointment(request, pk):

    if request.method == "GET":
        serviceAppointment = ServiceAppointment.objects.get(id=pk)
        return JsonResponse(
            serviceAppointment,
            encoder= ServiceAppointmentEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = ServiceAppointment.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count>0 })

    else:
        ServiceAppointment.objects.filter(id=pk).update(is_done=True)







@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse (
            {"technicians" : technicians},
            encoder = TechnicianEncoder,
        )
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse (
            technician,
            encoder=TechnicianEncoder,
            safe=False,
        )


@require_http_methods(["GET"])
def api_list_automobileVOs(request):
    if request.method == "GET":
        automobileVOs = AutomobileVO.objects.all()
        return JsonResponse (
            {"automobileVOs" : automobileVOs},
            encoder = AutomobileVOEncoder,
        )
