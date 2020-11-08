from django.contrib import admin
from .models import *
# Register your models here.



#
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('id','user_username','full_name','user_email','telephone','commune','solde')
    search_fields = ["user"]
    autocomplete_fields = ['commune']



admin.site.register(UserProfile,UserProfileAdmin)

admin.site.register(DemandePayement)

admin.site.register(AnonymousSession)
