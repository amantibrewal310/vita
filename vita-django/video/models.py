from django.db import models
from users.models import NewUser
# Create your models here.

class Video(models.Model):

    user = models.ForeignKey(NewUser, on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=250)
    thumbnail = models.ImageField(upload_to='images/', blank=True, null=True)
    videoFile = models.FileField(upload_to='videos/', blank=True, null=True)
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)

    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title



class Comment(models.Model):

    text = models.CharField(max_length=300)

    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)
    
    user = models.ForeignKey(NewUser, on_delete=models.CASCADE, null=True, blank=True)

    video = models.ForeignKey(Video, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.video.title
