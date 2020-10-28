from django.db import models
from django.contrib.auth.models import User
from post.models import Post

from django.db.models import F


class Buy(models.Model):
    date = models.DateField(auto_now_add=True)
    buyer = models.ForeignKey(
        User, on_delete=models.CASCADE, to_field="username", related_name="buyer")
    seller = models.ForeignKey(
        User, on_delete=models.CASCADE, to_field="username", related_name="seller")
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    postTitle = models.CharField(max_length=100)
    name = models.CharField(max_length=100, blank=True)
    address = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=100)
    dealtype = models.CharField(max_length=100)
    status = models.CharField(max_length=100, default="주문접수")
    tracknum = models.CharField(max_length=100, blank=True)
    about = models.TextField(blank=True)
    price = models.IntegerField()

    # 구매 발생 시 post 모델의 curnum 1 증가
    def save(self, *args, **kwards):
        if not self.pk:
            Post.objects.filter(pk=self.post_id).update(curnum=F('curnum')+1)
        super().save(*args, **kwards)
