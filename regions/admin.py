from django.contrib import admin
from .models import *



class PaysAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)


admin.site.register(Pays,PaysAdmin)


class WilayaAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)
    autocomplete_fields = ["pays"]


admin.site.register(Wilaya,WilayaAdmin)

class CommuneAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)
    list_filter=('wilaya__pays',)
    autocomplete_fields = ["wilaya"]


admin.site.register(Commune,CommuneAdmin)
