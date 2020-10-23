from django.db import models
from django.db.models import fields
from rest_framework import serializers

from .models import (Video, Comment, VideoCategory, ReportReason, 
                    VideoVote, CommentVote, VideoReport, CommentReport)


class VideoSerailizer(serializers.HyperlinkedModelSerializer):
    # adds user to the comment
    user = serializers.ReadOnlyField(source='user.id')

    class Meta:
        model = Video
        fields = ('id', 'title', 'description', 'thumbnail',
                  'videoFile', 'user', 'likes', 'dislikes', 'views')


class CommentSerializer(serializers.ModelSerializer):
    # adds user to the comment
    user = serializers.ReadOnlyField(source='user.id')
    created_at = serializers.DateTimeField(format="%d-%b-%Y %H:%M")

    class Meta:
        model = Comment
        fields = ('id', 'text', 'user', 'likes',
                  'dislikes', 'video', 'created_at')


class VideoCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoCategory
        fields = '__all__'


class ReportReasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportReason
        fields = '__all__'


class VideoVoteSerializer(serializers.ModelSerializer):
    # adds user to the comment
    user = serializers.ReadOnlyField(source='user.id')

    class Meta:
        model = VideoVote
        fields = '__all__'

