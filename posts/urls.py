from django.urls import path,re_path,include
from .views import *
from .api.api import PostAPI,AttAPI,SinglePostAPI

urlpatterns = [
    path('api',PostAPI.as_view(),name="PostAPI" ),
    path('api/<slug:slug>',SinglePostAPI.as_view(),name="SinglePostAPI" ),
    path('atrr/api',AttAPI.as_view(),name="AttAPI" ),
]
