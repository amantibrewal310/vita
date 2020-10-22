from video.models import Video
from rest_framework import routers
from django.urls import path, include

from . import views


router = routers.DefaultRouter()
router.register(r'video-list', views.VideoViewSet)
router.register(r'comment-list', views.CommentViewSet)
router.register(r'categories', views.VideoCategoryViewSet)
router.register(r'report-reason', views.ReportReasonViewSet)

urlpatterns = [
    path('<str:pk>/comments/', views.comment), # For Viewing comments of particular video
    path('', include(router.urls)),

    # check, delete user vote on the video
    path('video-vote/check/<int:video_id>/', views.checkVideoVote, name='getvideovote'),
    # get list of votes, make a vote
    path('video-vote/', views.videoVoteList, name='votevideolist'),
]
