from rest_framework import viewsets
from django.http import JsonResponse
from .serializers import VideoSerailizer, CommentSerializer
from .models import Video, Comment
from django.views.decorators.csrf import csrf_exempt  # as csrf will denied

# Create your views here.

@csrf_exempt
def comment(request, pk):
    comments = Comment.objects.all()
    serializer = CommentSerializer(comments, many=True)
    return JsonResponse(serializer.data, safe=False)

class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all().order_by('id')
    serializer_class = VideoSerailizer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all().order_by('id')
    serializer_class = CommentSerializer
