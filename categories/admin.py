from django.contrib import admin
from .models import *


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id','full_name','slug','image')
    search_fields = ["name","attribute",]
    autocomplete_fields = ['parent']

    def full_name(self, obj):

        return f'{obj}'


admin.site.register(Category,CategoryAdmin)
