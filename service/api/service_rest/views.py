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
    ]

    encoders= {
        "technician": TechnicianEncoder()
    }


    # def get_extra_data(self, o):
    #     count = AutomobileVO.objects.filter(vin=o.vin).count()
    #     return {"is VIP": count > 0}


@ require_http_methods(["GET", "POST"])
def api_list_service_appointments(request):
    if request.method == "GET":
        appointments = ServiceAppointment.objects.all()
        return JsonResponse(
            {"service appointments": appointments},
            encoder = ServiceAppointmentEncoder,
        )
