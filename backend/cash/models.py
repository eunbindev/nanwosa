from django.db import models

from buy.models import Buy
from post.models import Post
from django.contrib.auth.models import User


class Cash(models.Model):
    date = models.DateField(auto_now_add=True)
    # 입금은 1(True) 출금은 0(False)
    type = models.BooleanField()
    detail = models.CharField(max_length=100, blank=True)
    price = models.IntegerField()
    buy = models.ForeignKey(Buy, on_delete=models.CASCADE, null=True)
    seller = models.ForeignKey(
        User, on_delete=models.CASCADE, to_field="username", related_name="cashSeller")
    bank = models.CharField(max_length=100, blank=True)
    account = models.CharField(max_length=100, blank=True)
