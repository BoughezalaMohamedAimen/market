from django.db import models
from regions.models import Commune
from django.contrib.auth.models import User
import datetime

from posts.models import Post,AttributeValue

class OrderStatus(models.Model):
    name=models.CharField(max_length=255)
    color=models.CharField(max_length=7)

class Order(models.Model):
    created_at = models.DateTimeField(default=datetime.datetime.now)
    updated_at = models.DateTimeField(default=datetime.datetime.now)
    status=models.ForeignKey(OrderStatus,on_delete=models.CASCADE,null=True,blank=True)
    name=models.CharField(max_length=255)
    adress=models.CharField(max_length=325)
    commune=models.ForeignKey(Commune,on_delete=models.CASCADE)
    email=models.EmailField()
    phone=models.CharField(max_length=10)
    info=models.TextField(null='True',blank='True')
    remise=models.PositiveIntegerField(default=0)
    livraison=models.PositiveIntegerField()
    user=models.ForeignKey(User,on_delete=models.CASCADE,blank=True,null=True)


class OrderItem(models.Model):
    order=models.ForeignKey(Order,on_delete=models.CASCADE)
    post=models.ForeignKey(Post,on_delete=models.CASCADE)
    attributevalue=models.ManyToManyField(AttributeValue)
    qtt=models.PositiveIntegerField()
    price=models.PositiveIntegerField()
