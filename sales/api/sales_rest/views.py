from django.shortcuts import render

# Create your views here.

@require_http_methods(["GET", "POST"])
def api_sales_persons(request):
