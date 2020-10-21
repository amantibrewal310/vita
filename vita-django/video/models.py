from django.db import models
from users.models import NewUser
# Create your models here.


class Video(models.Model):

    class VideoObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status="published")

    options = (
        ('draft', 'Draft'),
        ('reported', 'Reported'),
        ('published', "Published"),
    )

    user = models.ForeignKey(
        NewUser, on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=250)
    thumbnail = models.ImageField(upload_to='images/')
    videoFile = models.FileField(upload_to='videos/')
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)
    reported = models.IntegerField(default=0)
    status = models.CharField(
        max_length=10, choices=options, default="published")

    uploaded_at = models.DateTimeField(auto_now_add=True)
    objects = models.Manager()  # default manager
    videoobjects = VideoObjects()  # custom manager

    def __str__(self):
        return self.title


class Comment(models.Model):

    class CommentObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status="published")
    options = (
        ('draft', 'Draft'),
        ('reported', 'Reported'),
        ('published', "Published"),
    )

    text = models.CharField(max_length=300)

    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)
    reported = models.IntegerField(default=0)

    status = models.CharField(
        max_length=10, choices=options, default="published")

    user = models.ForeignKey(
        NewUser, on_delete=models.CASCADE, null=True, blank=True)

    video = models.ForeignKey(Video, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = models.Manager()  # default manager
    commentobjects = CommentObjects()  # custom manager

    def __str__(self):
        return self.video.title
