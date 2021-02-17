from django.contrib import admin
from .models import *
from django.utils.safestring import mark_safe

class PostAdmin(admin.ModelAdmin):
    list_display = ('id','added','title','category','price','promotional','image_image1','valid')
    list_filter=('valid','category',)
    search_fields = ["name"]
    autocomplete_fields = ['attributes','category','user','motif']


    def image_image1(self, obj):
        return mark_safe(f'<img src="{obj.image1.url}" width="100" />')


    def changeform_view(self, request, *args, **kwargs):
        self.readonly_fields = list(self.readonly_fields)
        if not request.user.is_superuser:  #or another condition
            self.readonly_fields.append('user')
            self.readonly_fields.append('valid')
            self.readonly_fields.append('motif')
            self.readonly_fields.append('added')
            self.readonly_fields.append('updated')

        return super(PostAdmin, self).changeform_view(request, *args, **kwargs)

    def save_model(self, request, obj, form, change):
        if not change:
            if not request.user.is_superuser:
                obj.user = request.user
        obj.save()


admin.site.register(Post,PostAdmin)





class PostLivraisonAdmin(admin.ModelAdmin):
    list_display = ('id','wilaya','livraison')
    search_fields = ["wilaya",'posts']
    autocomplete_fields = ["posts",]


admin.site.register(PostLivraison,PostLivraisonAdmin)

class AttributeAdmin(admin.ModelAdmin):
    list_display = ('id','name','child')
    search_fields = ["name",]
    autocomplete_fields = ["child",]


admin.site.register(Attribute,AttributeAdmin)


class AttributeValueAdmin(admin.ModelAdmin):
    list_display = ('id','attribute','char_value','int_value','date_value')
    search_fields = ["char_value","attribute",]
    autocomplete_fields = ['attribute']


admin.site.register(AttributeValue,AttributeValueAdmin)


class MotifAdmin(admin.ModelAdmin):
    list_display = ('id','description')
    search_fields = ["description",]


admin.site.register(Motif,MotifAdmin)
