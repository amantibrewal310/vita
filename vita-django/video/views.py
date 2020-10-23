from django.db.models import query
from rest_framework import viewsets, generics, permissions, status, filters
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from django.http import JsonResponse
from .serializers import (VideoSerializer, CommentSerializer,
                          VideoCategorySerializer, ReportReasonSerializer,
                          VideoVoteSerializer, CommentVoteSerializer)
from .models import (ReportReason, Video, Comment,
                     VideoCategory, VideoVote, CommentVote)
from .permissions import IsOwnerOrReadOnly


# For Viewing comments of particular video
@api_view(['GET'])
def comment(request, pk):
    comments = Comment.objects.filter(video=pk).order_by('-created_at')
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


class VideoViewSet(viewsets.ModelViewSet):
    '''
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    '''
    queryset = Video.videoobjects.all().order_by('-uploaded_at')
    serializer_class = VideoSerializer

    # only authenticated users can create, update, delete
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    # NOTE: If this error Occurs
    # Cannot assign "<django.contrib.auth.models.AnonymousUser object at 0x7f02d4056940>": "Video.user" must be a "NewUser" instance.
    # Reason is user cannot be attached with video
    # Use postman with bearer token and json in body

    # The user is attached to video as he creates it
    # user is not manually picked from list options
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CommentViewSet(viewsets.ModelViewSet):
    '''
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    '''
    queryset = Comment.commentobjects.all().order_by('-created_at')
    serializer_class = CommentSerializer

    # NOTE: If this error Occurs
    # Cannot assign "<django.contrib.auth.models.AnonymousUser object at 0x7f7d0a605cd0>": "Comment.user" must be a "NewUser" instance.
    # do what we do in user case

    # only authenticated users can create, update, delete
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    # The user is attached to comment as he creates it
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# video category views
class VideoCategoryViewSet(viewsets.ModelViewSet):
    queryset = VideoCategory.objects.all()
    serializer_class = VideoCategorySerializer


# report reason views
class ReportReasonViewSet(viewsets.ModelViewSet):
    queryset = ReportReason.objects.all()
    serializer_class = ReportReasonSerializer


# video vote views
def updateVideoVoteStatus(video_id, action, value):
    video = Video.objects.get(id=video_id)
    likes = video.likes
    dislikes = video.dislikes

    if action == "like":
        likes += value
    elif action == "dislike":
        dislikes += value

    serializer = VideoSerializer(video, data={
        "likes": likes,
        "dislikes": dislikes
    }, partial=True)

    if serializer.is_valid():
        serializer.save(user=video.user)
    else:
        print(serializer.errors)


# vote video
@api_view(['POST'])
def videoVote(request):
    videoID = request.data['video']
    action = request.data['action']

    if action == 'checkStatus':
        try:
            result = VideoVote.objects.filter(video=videoID, user=request.user)
            if len(result) == 0:
                return Response(data={
                    "success": True,
                    "status": None,
                }, status=status.HTTP_200_OK)
            else:
                return Response(data={
                    "success": True,
                    "status": result.first().voteValue
                }, status=status.HTTP_200_OK)
        except:
            return Response(data={
                "success": False,
                "error": True,
                "msg": "Please send request with valid parameter"
            }, status=status.HTTP_400_BAD_REQUEST)
    
    else:
        try:
            result = VideoVote.objects.filter(video=videoID, user=request.user)
            if len(result) == 0:
                serializer = VideoVoteSerializer(data={
                    "video": videoID,
                    "voteValue": action
                })
                if serializer.is_valid():
                    updateVideoVoteStatus(videoID, action, 1)
                    serializer.save(user=request.user)
                    return Response({
                        "success": True,
                        "status": action
                    }, status=status.HTTP_201_CREATED)
            else:
                serializer = VideoVoteSerializer(result, many=True)
                data = serializer.data[0]
                if data['voteValue'] == action:
                    result.delete()
                    updateVideoVoteStatus(videoID, action, -1)
                    return Response({
                        "success": True,
                        "status": "None"
                    }, status=status.HTTP_202_ACCEPTED)
                else:
                    serializer = VideoVoteSerializer(data={
                        "video": videoID,
                        "voteValue": action
                    })
                    if serializer.is_valid():
                        result.delete()
                        updateVideoVoteStatus(videoID, action, 1)
                        action = 'like' if action == 'dislike' else 'dislike'
                        updateVideoVoteStatus(videoID, action, -1)
                        action = 'like' if action == 'dislike' else 'dislike'
                        serializer.save(user=request.user)
                        return Response({
                            "success": True,
                            "status": action
                        }, status=status.HTTP_200_OK)
        except:
            return Response(data={
                "success": False,
                "error": True,
                "msg": "Please pass with proper parameter"
            }, status=status.HTTP_400_BAD_REQUEST)


def updateCommentVoteStatus(commentID, action, value):
    comment = Comment.objects.get(id=commentID)
    likes = comment.likes
    dislikes = comment.dislikes

    if action == "like":
        likes += value
    elif action == "dislike":
        dislikes += value

    serializer = CommentSerializer(comment, data={
        "likes": likes,
        "dislikes": dislikes
    }, partial=True)

    if serializer.is_valid():
        serializer.save(user=comment.user)
    else:
        print(serializer.errors)


@api_view(['POST'])
def commentVote(request):
    commentID = request.data['comment']    
    action = request.data['action']

    if action == 'checkStatus':
        try:
            result = CommentVote.objects.filter(
                comment=commentID, user=request.user)

            if len(result) == 0:
                return Response(data={
                    "success": True,
                    "status": None,
                }, status=status.HTTP_200_OK)
            else:
                return Response(data={
                    "success": True,
                    "status": result.first().voteValue
                }, status=status.HTTP_200_OK)
        except:
            return Response(data={
                "success": False,
                "error": True,
                "msg": "Please send request with valid parameter"
            }, status=status.HTTP_400_BAD_REQUEST)

    else:
        try:
            result = CommentVote.objects.filter(
                comment=commentID, user=request.user)
            if len(result) == 0:
                serializer = CommentVoteSerializer(data={
                    "comment": commentID,
                    "voteValue": action
                })
                if serializer.is_valid():
                    updateCommentVoteStatus(commentID, action, 1)
                    serializer.save(user=request.user)
                    return Response({
                        "success": True,
                        "status": action
                    }, status=status.HTTP_201_CREATED)
            else:
                serializer = CommentVoteSerializer(result, many=True)
                data = serializer.data[0]
                if data['voteValue'] == action:
                    result.delete()
                    updateCommentVoteStatus(commentID, action, -1)
                    return Response({
                        "success": True,
                        "status": "None"
                    }, status=status.HTTP_202_ACCEPTED)
                else:
                    serializer = CommentVoteSerializer(data={
                        "comment": commentID,
                        "voteValue": action
                    })
                    if serializer.is_valid():
                        result.delete()
                        updateCommentVoteStatus(commentID, action, 1)
                        action = 'like' if action == 'dislike' else 'dislike'
                        updateCommentVoteStatus(commentID, action, -1)
                        action = 'like' if action == 'dislike' else 'dislike'
                        serializer.save(user=request.user)
                        return Response({
                            "success": True,
                            "status": action
                        }, status=status.HTTP_200_OK)

        except:
            return Response(data={
                "success": False,
                "error": True,
                "msg": "Please pass with proper parameter"
            }, status=status.HTTP_400_BAD_REQUEST)


# video search, for both admin and user
# end point - /api/video/video-search/?search=[query string]
class VideoSearchView(generics.ListAPIView):
    serializer_class = VideoSerializer
    queryset = Video.objects.all()
    search_fields = ['title', 'description']
    filter_backends = (filters.SearchFilter,)


# order/sorted results for admin
class VideoOrderView(generics.ListAPIView):
    serializer_class = VideoSerializer

    def get_queryset(self):
        queryset = Video.objects.all()
        dict = self.request.query_params
        print(dict)

        # likes, dislikes, views, reported
        orderby = dict.get('orderby', None)
        if orderby is not None: 
            queryset = queryset.order_by('-' + orderby)

        return queryset
