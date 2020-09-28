from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
from django.db.models.signals import post_save,post_delete
import hashlib
from datetime import datetime
import os
from binascii import hexlify
from regions.models import *



METHODE_PAYMENT_CHOICES=(('Virement ccp','Virement ccp'),('Virement Bancaire','Virement Bancaire'),('Cash','Cash'),)
ROLE_CHOICES=(('Client','Client'),('Vendeur','Vendeur'),('Blogeur','Blogeur'),)

def createactive():
    return hashlib.md5(str(datetime.now()).encode()).hexdigest()


# Create your models here.
class UserProfile(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    telephone=models.CharField(null='True',max_length=10)
    adresse=models.CharField(max_length=325,default='alger')
    commune=models.ForeignKey(Commune,on_delete=models.CASCADE,null='true')
    activate=models.CharField(max_length=255,unique='True')
    solde=models.IntegerField(default=0)
    rolee=models.CharField(max_length=255,choices=ROLE_CHOICES,default="Client")

    def __str__(self):
        return self.user.username



def create_profile(sender, **kwargs):
    if kwargs['created']:
        user_profile = UserProfile.objects.create(user=kwargs['instance'],activate=createactive())

post_save.connect(create_profile, sender=User)




class Payement(models.Model):
    created= models.DateTimeField(default=datetime.now, blank='True')
    user=models.ForeignKey(User,on_delete=models.CASCADE,null='True')
    montant=models.PositiveIntegerField()
    observation=models.TextField(null='True')


class DemandePayement(models.Model):
    created= models.DateTimeField(default=datetime.now, blank='True')
    user=models.ForeignKey(User,on_delete=models.CASCADE,blank='True')
    montant=models.PositiveIntegerField()
    methode=models.CharField(max_length=255,choices=METHODE_PAYMENT_CHOICES)
    message=models.TextField(blank='True',null='True')

from django.dispatch import receiver


@receiver(post_save, sender=Payement)
def payment_save_handler(sender, **kwargs):
    print('****************')
    usr=UserProfile.objects.get(user=kwargs['instance'].user)
    usr.solde-=kwargs['instance'].montant
    usr.save()
    print(usr)

@receiver(post_delete, sender=Payement)
def payment_delete_handler(sender, **kwargs):
    usr=UserProfile.objects.get(user=kwargs['instance'].user)
    usr.solde+=kwargs['instance'].montant
    usr.save()
