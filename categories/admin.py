from django.contrib import admin
from .models import *


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id','name','image')
    search_fields = ["name","attribute",]
    autocomplete_fields = ['parent']


admin.site.register(Category,CategoryAdmin)
