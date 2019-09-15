from . import views
from django.urls import path, include
from rest_framework import routers

router = routers.DefaultRouter()
router.register('posts', views.PostViewSet)
app_name = 'post'

# the router will match this /posts first
# TODO: combine ViewSet with customized list view
# urlpatterns = [
#     path('posts/', views.PostList.as_view(), name='posts'),
# ]
# # registers list, create, retrieve, update, partial_update
# # and destroy
# # https://www.django-rest-framework.org/api-guide/routers/#simplerouter
# urlpatterns += router.urls

# router.register(r'users', views.PostViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls))
]
