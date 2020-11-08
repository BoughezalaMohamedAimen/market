from django.contrib import admin
from django.urls import path,include,re_path
from .api.api import CartApi,AddCartApi

urlpatterns = [
        path('api/add',AddCartApi.as_view(),name='add_to_cart'),
        # path('delete/<int:id>',DeleteCart.as_view(),name='delete_from_cart'),
        # path('update/<int:id>/<int:qtt>/', UpdateCart.as_view(),name='update_cart'),
        path('api', CartApi.as_view(),name='CartApi'),
]
