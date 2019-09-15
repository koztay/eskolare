from django.urls import path, re_path
from .views import CurrentUserAPIView, FacebookLogin, TwitterLogin


urlpatterns = [
    path("user/", CurrentUserAPIView.as_view(), name="current-user"),
    re_path(r'^rest-auth/facebook/$', FacebookLogin.as_view(), name='fb_login'),
    re_path(r'^rest-auth/twitter/$', TwitterLogin.as_view(), name='twitter_login')
]
