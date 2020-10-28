from django.db import models
from django.contrib.auth.models import User


class Post(models.Model):
    date = models.DateField(auto_now_add=True)
    title = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    price = models.IntegerField()
    totalnum = models.IntegerField()
    curnum = models.IntegerField(default=0)
    dealtype = models.CharField(max_length=100)
    content = models.TextField()
    writer = models.ForeignKey(
        User, on_delete=models.CASCADE, to_field="username")
    image = models.ImageField(upload_to="post_images", blank=True)

    def __str__(self):
        return self.title
