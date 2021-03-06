from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views


router = DefaultRouter()
router.register('categories', views.CategoryViewSet)

app_name = 'category'  # reverse('category:category-list')  buraya yazdığımız isme göre çağırıyoruz.

urlpatterns = [
    path('', include(router.urls))
]
