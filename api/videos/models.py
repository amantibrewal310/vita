from django.db import models

# Create your models here.

class Video(models.Model):
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=250)
    thumbnail = models.ImageField(upload_to='videos/', blank=True, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

