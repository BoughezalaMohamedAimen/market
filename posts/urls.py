from django.urls import path,re_path,include
from .views import *
from .api.api import PostAPI,AttAPI

urlpatterns = [
    path('api',PostAPI.as_view(),name="PostAPI" ),
    path('atrr/api',AttAPI.as_view(),name="AttAPI" ),
]
