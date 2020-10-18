from rest_framework import viewsets, generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
from .serializers import VideoSerailizer, CommentSerializer
from .models import Video, Comment
from .permissions import IsOwnerOrReadOnly


 
# For Viewing comments of particular video
@api_view(['GET'])
def comment(request, pk):
    comments = Comment.objects.filter(video=pk)
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


class VideoViewSet(viewsets.ModelViewSet):
    '''
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    '''
    queryset = Video.objects.all().order_by('id')
    serializer_class = VideoSerailizer
    
    # only authenticated users can create, update, delete
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    # The user is attached to video as he creates it
    # user is not manually picked from list options 
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CommentViewSet(viewsets.ModelViewSet):
    '''
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    '''
    queryset = Comment.objects.all().order_by('id')
    serializer_class = CommentSerializer
    
    # only authenticated users can create, update, delete
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

     # The user is attached to comment as he creates it
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
