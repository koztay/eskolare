from rest_framework import viewsets, mixins, status
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from ..models import Category
from .serializers import CategorySerializer


class CategoryViewSet(viewsets.GenericViewSet, mixins.ListModelMixin):
    """Viewset for product Categories"""
    authentication_classes = ()  # listelemek için login olmaya gerek yok.
    permission_classes = ()  # listelemek için login olmaya gerek yok.
    # ana kategorileri getirmesi ve altına onun childrenlarını getirmesi lazım
    queryset = Category.objects.filter(parent=None)
    # queryset = Category.objects.all()
    serializer_class = CategorySerializer
