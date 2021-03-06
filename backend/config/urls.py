from allauth.account.views import confirm_email
from django.conf import settings
from django.urls import include, path, re_path
from django.conf.urls.static import static
from django.contrib import admin
#  from django.views.generic import TemplateView
from django.views import defaults as default_views


from eskolare.users.api.serializers import CustomJWTSerializer

from rest_framework_jwt.views import (
    ObtainJSONWebToken,
    obtain_jwt_token,
    refresh_jwt_token,
    verify_jwt_token,
)

urlpatterns = [
    # path("", TemplateView.as_view(template_name="pages/home.html"), name="home"),
    # path(
    #     "about/", TemplateView.as_view(template_name="pages/about.html"), name="about"
    # ),
    # Django Admin, use {% url 'admin:index' %}
    path(settings.ADMIN_URL, admin.site.urls),
    # User management
    path("users/", include("eskolare.users.urls", namespace="users")),  # testler çalışmıyor disable edince
    path("accounts/", include("allauth.urls")),

    # Your stuff: custom urls includes go here
    # REST Framework

    # path("accounts/",
    #      include("django_registration.backends.one_step.urls")),

    # path("accounts/",
    #      include("django.contrib.auth.urls")),

    path("api-auth/", include("rest_framework.urls")),
    path("api/rest-auth/", include("rest_auth.urls")),
    path("api/rest-auth/registration/", include("rest_auth.registration.urls")),
    re_path(r'^api/registration/account-confirm-email/(?P<key>.+)/$',
            confirm_email, name='account_confirm_email'),


    path('api/', include('books.urls')),
    path('api/', include("eskolare.users.api.urls")),
    path('api/', include('categories.api.urls')),
    # path('api/', include('sellers.api.urls')),

    # email authentication with JWT
    re_path(r'^api/auth/obtain_token/$', ObtainJSONWebToken.as_view(serializer_class=CustomJWTSerializer), name='api-jwt-auth'),
    # re_path(r'^api/auth/obtain_token/$', obtain_jwt_token, name='api-jwt-auth'),
    re_path(r'^api/auth/refresh_token/$', refresh_jwt_token, name='api-jwt-refresh'),
    re_path(r'^api/auth/verify_token/$', verify_jwt_token, name='api-jwt-verify'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    # This allows the error pages to be debugged during development, just visit
    # these url in browser to see how these error pages look like.
    urlpatterns += [
        path(
            "400/",
            default_views.bad_request,
            kwargs={"exception": Exception("Bad Request!")},
        ),
        path(
            "403/",
            default_views.permission_denied,
            kwargs={"exception": Exception("Permission Denied")},
        ),
        path(
            "404/",
            default_views.page_not_found,
            kwargs={"exception": Exception("Page not Found")},
        ),
        path("500/", default_views.server_error),
    ]
    if "debug_toolbar" in settings.INSTALLED_APPS:
        import debug_toolbar

        urlpatterns = [path("__debug__/", include(debug_toolbar.urls))] + urlpatterns
