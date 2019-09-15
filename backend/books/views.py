
from rest_framework import permissions, viewsets
from rest_framework.decorators import (authentication_classes,
                                       permission_classes)

from .models import Author, Book, Review
from .serializers import AuthorSerializer, BookSerializer, ReviewSerializer
from .permissions import IsOwnerOrReadOnly, IsAdminUserOrReadOnly


class BookViewSet(viewsets.ModelViewSet):
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsAdminUserOrReadOnly
    )
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class AuthorViewSet(viewsets.ModelViewSet):
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsAdminUserOrReadOnly
    )
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer


class ReviewViewSet(viewsets.ModelViewSet):
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsOwnerOrReadOnly,
    )
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
