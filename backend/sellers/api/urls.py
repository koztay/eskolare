from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views


router = DefaultRouter()
router.register('sellers', views.SellerViewSet)

app_name = 'seller'  # reverse('seller:seller-list')  buraya yazdığımız isme göre çağırıyoruz.

urlpatterns = [
    path('', include(router.urls)),
    path('sellers/<int:pk>/like/', views.LikeSellerView.as_view(), name='seller-like'),
    path('sellers/<int:pk>/dislike/', views.DislikeSellerView.as_view(), name='seller-dislike')
]
