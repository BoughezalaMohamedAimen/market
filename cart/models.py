from django.db import models
from django.contrib.auth.models import User
from posts.models import Post,AttributeValue
from datetime import datetime
from django.utils import timezone
from posts.api.serializers import PostSerializer

class Cart(models.Model):
    created_at = models.DateTimeField(default=timezone.now)
    user=models.OneToOneField(User,on_delete=models.CASCADE)


    def getTotal(self):
        total=0
        items=CartItem.objects.filter(cart=self)
        for item in items:
            total+=item.total
        return total


class CartItem(models.Model):
    total=models.PositiveIntegerField()
    post=models.ForeignKey(Post,on_delete=models.CASCADE)
    attributevalue=models.ManyToManyField(AttributeValue,blank=True)
    qtt=models.PositiveIntegerField()
    cart=models.ForeignKey(Cart,on_delete=models.CASCADE)

    @property
    def post_details(self):
        return PostSerializer(self.post).data

    # def update_total(self):
    #     try:
    #         self.total=self.qtt*self.product_with_attribute.prix #if self.product_with_attribute.prix else self.qtt*self.product_with_attribute.prix_promotionel
    #     except:
    #         print(self.produit.prix_promotionel)
    #         self.total=self.qtt*self.produit.prix if self.produit.prix_promotionel==0 else self.qtt*self.produit.prix_promotionel
    #     return self.total
