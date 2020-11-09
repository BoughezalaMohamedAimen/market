from django.contrib import admin
from django.urls import path,include,re_path
from .api.api import CartApi,AddCartApi,DeleteCartItemApi,CartItemQttApi

urlpatterns = [
        path('api/add',AddCartApi.as_view(),name='add_to_cart'),
        path('api/delete/',DeleteCartItemApi.as_view(),name='delete_from_cart'),
        path('api/qtt/',CartItemQttApi.as_view(),name='cart_item_qtt'),
        # path('delete/<int:id>',DeleteCart.as_view(),name='delete_from_cart'),
        # path('update/<int:id>/<int:qtt>/', UpdateCart.as_view(),name='update_cart'),
        path('api', CartApi.as_view(),name='CartApi'),
]
