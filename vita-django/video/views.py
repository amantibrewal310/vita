from django.db.models import query
from rest_framework import viewsets, generics, permissions, status
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

# # video vote views (create, update, delete)
# @api_view(['GET', 'POST'])
# def videoVoteList(request):

#     # listing all the votes on video
#     if request.method == 'GET':
#         votes = VideoVote.objects.all()
#         serializer = VideoVoteSerializer(votes, many=True)
#         return Response(serializer.data)

#     # making a vote
#     elif request.method == 'POST':
#         serializer = VideoVoteSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(user=request.user)
#             return Response(serializer.data, status.HTTP_201_CREATED)

#         return Response(serializer.errors)


# # if logged in user has voted on this video before
# # filter will return array with 1 vote detail
# # else empty array is returned
# @api_view(['GET', 'DELETE'])
# def checkVideoVote(request, video_id):

#     vote = VideoVote.objects.filter(video=video_id, user=request.user)

#     if request.method == 'GET':
#         serializer = VideoVoteSerializer(vote, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)

#     # delete is called when user has already made vote on video_id
#     elif request.method == 'DELETE':
#         vote[0].delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

def updateVideoVoteStatus(video_id, action, value):
    video = Video.objects.get(id=video_id)
    likes = video.likes
    dislikes = video.dislikes

    fields = ('title', 'description', 'thumbnail',
              'videoFile', 'user', 'likes', 'dislikes')

    data = dict((x, y) for x, y in video.__dict__.items() if x in fields)
    print(data)

    if action == "like":
        likes += value
    elif action == "dislike":
        dislikes += value

    data['likes'] = likes
    data['dislikes'] = dislikes
    data.pop('thumbnail')
    data.pop('videoFile')
    # data['user'] = result.__dict__['user_id']
    print("hello")

    serializer = VideoSerializer(video, data=data, partial=True)
    print(serializer)

    if serializer.is_valid():
        print("valid")
        serializer.save(user=video.user)
    else:
        print("invalid")
        print(serializer.errors)


@api_view(['GET'])
def videoVote(request):
    videoID = request.data['video']
    action = request.data['action']

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
                return Response(serializer.data, status=status.HTTP_201_CREATED)
    except:
        pass
    return JsonResponse({"user": "videoID"})
