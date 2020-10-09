# from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.


def home(request):
    return JsonResponse({'info': 'Webster 2K20 Project', 'team_name': 'web_PLASH'})
