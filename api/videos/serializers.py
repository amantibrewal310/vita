from rest_framework import serializers

from .models import Video, Comment

class VideoSerailizer(serializers.HyperlinkedModelSerializer):
    thumbnail = serializers.ImageField(max_length=None, allow_empty_file=False, allow_null=True, required=False) # For Full URL of Image
    class Meta:
        model = Video
        fields = ('title', 'description', 'thumbnail', 'videoFile', 'user', 'likes', 'dislikes')

class CommentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

