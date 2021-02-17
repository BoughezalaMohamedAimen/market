from django.urls import path,re_path,include
from .views import *
from .api.api import OrderAPI

urlpatterns = [
    path('api/new/',OrderAPI.as_view(),name="NewOrder" ),
]
