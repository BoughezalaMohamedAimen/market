from django.db import models
from django.contrib.auth.models import User
from posts.models import Post,AttributeValue
from datetime import datetime
from django.utils import timezone
from posts.api.serializers import PostSerializer
from accounts.models import AnonymousSession

class Cart(models.Model):
    created_at = models.DateTimeField(default=timezone.now)
    user=models.OneToOneField(User,on_delete=models.CASCADE,blank=True,null=True)
    session=models.ForeignKey(AnonymousSession,on_delete=models.CASCADE,blank=True,null=True)



    def getTotal(self):
        total=0
        items=CartItem.objects.filter(cart=self)
        for item in items:
            total+=item.total
        return total


class CartItem(models.Model):
    post=models.ForeignKey(Post,on_delete=models.CASCADE)
    attributevalues=models.ManyToManyField(AttributeValue,blank=True)
    qtt=models.PositiveIntegerField()
    cart=models.ForeignKey(Cart,on_delete=models.CASCADE)


    @property
    def item_total(self):
        return self.post.price*self.qtt if self.post.promotional ==0 else self.post.promotional*self.qtt

    @property
    def post_details(self):
        return PostSerializer(self.post).data

    @property
    def item_attributes_details(self):
        return [{'attribute':attributevalue.attribute.name,'value':attributevalue.__str__()}  for attributevalue in self.attributevalues.all()]


    def __str__(self):
        attributes=[atrvalue.__str__() for atrvalue in self.attributevalues.all()]
        return f'{self.post} {" ".join(attributes)}'

    # def update_total(self):
    #     try:
    #         self.total=self.qtt*self.product_with_attribute.prix #if self.product_with_attribute.prix else self.qtt*self.product_with_attribute.prix_promotionel
    #     except:
    #         print(self.produit.prix_promotionel)
    #         self.total=self.qtt*self.produit.prix if self.produit.prix_promotionel==0 else self.qtt*self.produit.prix_promotionel
    #     return self.total
