from django.contrib import admin
from .models import Order,OrderItem,OrderStatus

class OrderAdmin(admin.ModelAdmin):
    list_display = ('created_at','updated_at','status','name','adress','commune','email','phone','info','remise','livraison','user')
    list_filter = ('status','created_at','updated_at')
    # search_fields = ["name"]
    # autocomplete_fields = ['attributes','category','user','motif']



admin.site.register(Order,OrderAdmin)


class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order','post','qtt','price')

    # search_fields = ["name"]
    # autocomplete_fields = ['attributes','category','user','motif']



admin.site.register(OrderItem,OrderItemAdmin)

class OrderStatusAdmin(admin.ModelAdmin):
    list_display = ('name','color')
    # search_fields = ["name"]
    # autocomplete_fields = ['attributes','category','user','motif']



admin.site.register(OrderStatus,OrderStatusAdmin)
