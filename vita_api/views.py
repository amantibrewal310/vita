from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from video.models import Video
from video.serializers import VideoSerializer
# Create your views here.


@api_view(['GET'])
def GetVideosByCategory(request):
    pk = request.GET['category']
    result = Video.objects.filter(category=pk, status="published")
    print(result)
    serializer = VideoSerializer(result, many=True)
    return Response(serializer.data)
