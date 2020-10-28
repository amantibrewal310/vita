from django.db import models
from django.db.models import fields
from rest_framework import serializers

from membership.serializers import MembershipSerializer

from .models import (Video, Comment, VideoCategory, ReportReason,
                     VideoVote, CommentVote, VideoReport, CommentReport)

from membership.serializers import MembershipSerializer


class VideoSerializer(serializers.ModelSerializer):
    # adds user to the comment
    user = serializers.ReadOnlyField(source='user.id')
    thumbnail = serializers.ImageField(
        max_length=None, allow_empty_file=False, allow_null=True, required=False)
    videoFile = serializers.FileField(
        allow_empty_file=False, allow_null=True, required=False)

    # allowed_membership = MembershipSerializer(many=True)
    allowed_membership = models.CharField(max_length=1024)

    class Meta:
        model = Video
        fields = ('id', 'title', 'description', 'thumbnail',
                  'videoFile', 'user', 'likes', 'dislikes',
                  'views', 'reported', 'status', 'category', 'playtime', 'allowed_membership')


class CommentSerializer(serializers.ModelSerializer):
    # adds user to the comment
    user = serializers.ReadOnlyField(source='user.id')
    created_at = serializers.DateTimeField(format="%d-%b-%Y %H:%M")

    class Meta:
        model = Comment
        fields = ('id', 'text', 'user', 'likes',
                  'dislikes', 'video', 'created_at', "reported", "status")


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
        fields = ('video', 'voteValue', 'user')


class CommentVoteSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.id')

    class Meta:
        model = CommentVote
        fields = ('comment', 'voteValue', 'user')


class VideoReportSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.id')

    class Meta:
        model = VideoReport
        fields = ('video', 'reason', 'user')


class CommentReportSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.id")

    class Meta:
        model = CommentReport
        fields = ('comment', 'reason', 'user')
