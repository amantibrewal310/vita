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
    path('video-vote/', views.videoVote, name='vote-video'),
    path('comment-vote/', views.commentVote, name='vote-comment'),
    path('report-video/', views.ReportVideo, name='report-video'),
    path('report-comment/', views.ReportComment, name='report-comment'),
    path('reported-video-list/', views.ReportedVideoList,
         name="reported-video-list"),
    path('reported-video/<int:pk>/', views.ReportedVideoDetail,
         name="reported-video-detail"),
    path('reported-comment-list/', views.ReportedCommentList,
         name="reported-comment-list"),
    path('reported-comment/<int:pk>/', views.ReportedCommentDetail,
         name="reported-comment-detail"),

    path('reported-video/final/', views.UpdateVideoStatus,
         name="updateVideoStatus"),
    path('reported-comment/final/', views.UpdateCommentStatus,
         name="updateCommentStatus")


]
