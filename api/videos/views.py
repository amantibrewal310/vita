from rest_framework import viewsets
from django.http import JsonResponse
from .serializers import VideoSerailizer, CommentSerializer
from .models import Video, Comment
from django.views.decorators.csrf import csrf_exempt  # as csrf will denied

# permissions 
from rest_framework import permissions
from .permissions import IsOwnerOrReadOnly


# Not needed probably 

# @csrf_exempt
# def comment(request, pk):
#     comments = Comment.objects.all()
#     serializer = CommentSerializer(comments, many=True)
#     return JsonResponse(serializer.data, safe=False)


class VideoViewSet(viewsets.ModelViewSet):
    '''
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    '''
    queryset = Video.objects.all().order_by('id')
    serializer_class = VideoSerailizer
    
    # only authenticated users can create, update, delete
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

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
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

     # The user is attached to comment as he creates it
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
