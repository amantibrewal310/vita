from rest_framework import viewsets

from .serializers import VideoSerailizer, CommentSerializer
from .models import Video, Comment
# Create your views here.


class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all().order_by('id')
    serializer_class = VideoSerailizer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all().order_by('id')
    serializer_class = CommentSerializer
