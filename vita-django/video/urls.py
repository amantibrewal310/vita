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
    # For Viewing comments of particular video
    path('<str:pk>/comments/', views.comment),
    path('', include(router.urls)),
    path('video-vote/', views.videoVote, name='votevideo'),

    # check, delete user vote on the video
    # path('video-vote/check/<int:video_id>/',
    #      views.checkVideoVote, name='getvideovote'),
    # get list of votes, make a vote


]
