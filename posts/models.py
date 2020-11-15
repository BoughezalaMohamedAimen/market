from django.db import models
from django.contrib.auth.models import User


from regions.models import *
from categories.models import Category
from ckeditor.fields import RichTextField

from django.utils.text import slugify

import datetime


def upload_location(instance, filename):
    filebase, extension = filename.split('.')
    dte=str(datetime.datetime.today().date())
    dte=dte.replace('-', '')
    return 'posts/%s/%s.%s' % (instance.user.username,instance.user.username+f'{dte}', extension)



class Attribute(models.Model):
    name=models.CharField(max_length=255)
    filter_order=models.PositiveIntegerField()
    display_order=models.PositiveIntegerField()
    title_order=models.IntegerField(default=-1)
    is_related=models.BooleanField(default=False)
    child=models.ForeignKey("self",on_delete=models.CASCADE,blank=True,null=True)


    @property
    def attribute_values(self):
        from .api.serializers import AttributeValueSerializer
        attributesvalues=AttributeValue.objects.filter(attribute=self)
        return AttributeValueSerializer(attributesvalues,many=True).data

    def __str__(self):
        return self.name



class AttributeValue(models.Model):
    attribute=models.ForeignKey(Attribute,on_delete=models.CASCADE,db_index=True)
    char_value=models.CharField(max_length=255,db_index=True,blank=True,null=True)
    int_value=models.CharField(max_length=255,db_index=True,blank=True,null=True)
    date_value=models.CharField(max_length=255,db_index=True,blank=True,null=True)
    related_values=models.ManyToManyField("self",blank=True)

    def __str__(self):
        if self.char_value:
            return self.char_value
        if self.int_value:
            return self.int_value
        if self.date_value:
            return self.date_value



class Motif(models.Model):
    description=models.CharField(max_length=255)

    def __str__(self):
        return self.description




class Post(models.Model):
    added=models.DateField(default=datetime.datetime.now,blank=True,db_index=True)
    updated=models.DateField(default=datetime.datetime.now,blank=True,db_index=True)

    user=models.ForeignKey(User,on_delete=models.CASCADE,db_index=True)
    category=models.ForeignKey(Category,on_delete=models.CASCADE)

    slug=models.SlugField(blank='True',max_length=255,db_index=True)
    title=models.CharField(max_length=255,db_index=True)
    description=RichTextField(db_index=True)
    price=models.PositiveIntegerField(blank=True,db_index=True)
    promotional=models.PositiveIntegerField(default=0,db_index=True)

    attributes=models.ManyToManyField(AttributeValue,blank=True)
    valid=models.BooleanField(default=False)
    motif=models.ForeignKey(Motif,on_delete=models.CASCADE,blank='True',null='True')

    image1=models.ImageField(upload_to=upload_location,blank=True,null=True)
    image2=models.ImageField(upload_to=upload_location,blank=True,null=True)
    image3=models.ImageField(upload_to=upload_location,blank=True,null=True)
    image4=models.ImageField(upload_to=upload_location,blank=True,null=True)
    image5=models.ImageField(upload_to=upload_location,blank=True,null=True)
    image6=models.ImageField(upload_to=upload_location,blank=True,null=True)

    # def get_absolute_url(self):
        # return reverse('single_product',args=[str(self.slug)])



    @property
    def post_category_name(self):
        return self.category.name

    @property
    def post_user(self):
        from accounts.api.serializers import EditProfileSerializer
        return EditProfileSerializer(self.user.userprofile).data

    @property
    def post_attributes(self):
        try:
            from .api.serializers import AttributeValueSerializer
            from django.db.models import Count
            attributes_values=self.attributes.all()
            attributes=self.attributes.all().values('attribute__name').annotate(dcount=Count('attribute'))
            result=[]
            for attribute in attributes:
                result.append({attribute["attribute__name"]:AttributeValueSerializer(attributes_values.filter(attribute__name=attribute["attribute__name"]),many=True).data})
            return result
        except Exception as e:
            print(e)

    @property
    def post_livraison(self):
        from .api.serializers import PostLivraisonSerializer
        return PostLivraisonSerializer(PostLivraison.objects.filter(posts=self),many=True).data

    def __str__(self):
        return self.title


    def save(self, *args, **kwargs):
        self.slug+=f'{self.category.slug}-{slugify(self.title)}-{self.user.userprofile.commune.wilaya.name}-annonces-vente-echange-en-ligne-livraison-a-domicile-dz-algerie'
        if self.id:
            self.slug+='-'+str(self.id)
        super().save(*args, **kwargs)
        if self.slug.split('-')[-1]!=str(self.id):
            print(self.slug.split('-')[-1])
            self.slug=f'{self.category.slug}-{slugify(self.title)}-{self.user.userprofile.commune.wilaya.name}-annonces-vente-echange-en-ligne-livraison-a-domicile-dz-algerie-{self.id}'
            super().save(*args, **kwargs)

class PostLivraison(models.Model):
    livraison=models.PositiveIntegerField(default=0)
    posts=models.ManyToManyField(Post)
    wilaya=models.ForeignKey(Wilaya,on_delete=models.CASCADE)
