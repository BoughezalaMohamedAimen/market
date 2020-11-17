from django.contrib import admin
from django.urls import path,re_path,include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.authtoken import views
# from .static_views import Home
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^accounts/',include('accounts.urls')),
    re_path(r'^posts/',include('posts.urls')),
    re_path(r'^categories/',include('categories.urls')),
    re_path(r'^pays/',include('regions.urls')),
    re_path(r'^cart/',include('cart.urls')),
    re_path(r'^order/',include('orders.urls')),
    path('api-auth/', views.obtain_auth_token,name="obtain_auth_token"),
]+  static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

admin.site.site_header='Administration du magasin'
