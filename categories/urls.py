from django.urls import path,re_path,include
from .views import *
from .api.api import CategoryAPI

urlpatterns = [
    path('api',CategoryAPI.as_view(),name="CategoryAPI" ),
]
