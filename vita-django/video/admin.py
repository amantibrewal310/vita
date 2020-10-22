from django.contrib import admin
from .models import (Video, Comment, VideoCategory, 
                    VideoVote, CommentVote, CommentReport, 
                    VideoReport, ReportReason)
# Register your models here.

admin.site.register(Video)
admin.site.register(Comment)
admin.site.register([VideoCategory, VideoVote, CommentVote, 
                    CommentReport, VideoReport, ReportReason])