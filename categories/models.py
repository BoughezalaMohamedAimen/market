
from django.db import models
from django.utils.text import slugify



# from posts.models import Attribute





class Category(models.Model):
    name=models.CharField(max_length=255,db_index=True)
    slug = models.SlugField(unique=True,blank=True)
    parent=models.ForeignKey('self',on_delete=models.CASCADE,null=True,blank=True)
    image=models.ImageField(null=True,blank=True,upload_to='categories')
    attributes=models.ManyToManyField("posts.Attribute",blank=True)



    def save(self, *args, **kwargs):
            self.slug=slugify(self.name)
            super().save(*args, **kwargs)

    def __str__(self):
        full_path = [self.name]

        k = self.parent

        while k is not None:
            full_path.append(k.name)
            k = k.parent

        return ' -> '.join(full_path[::-1])
