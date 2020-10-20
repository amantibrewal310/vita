from rest_framework import serializers

from .models import Video, Comment


class VideoSerailizer(serializers.HyperlinkedModelSerializer):
    # adds user to the comment
    user = serializers.ReadOnlyField(source='user.id')

    class Meta:
        model = Video
        fields = ('id', 'title', 'description', 'thumbnail', 'videoFile', 'user', 'likes', 'dislikes')



class CommentSerializer(serializers.ModelSerializer):
    # adds user to the comment
    user = serializers.ReadOnlyField(source='user.id')
    
    class Meta:
        model = Comment
        fields = ('id', 'text', 'user', 'likes', 'dislikes', 'video', 'created_at')

    