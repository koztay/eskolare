from .models import Book, Author, Review
from .serializers import BookSerializer, AuthorSerializer, ReviewSerializer


from rest_framework import viewsets
from rest_framework.decorators import (
    authentication_classes,
    permission_classes,
)


class BookViewSet(viewsets.ModelViewSet):
    authentication_classes = ()
    permission_classes = ()
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class AuthorViewSet(viewsets.ModelViewSet):
    authentication_classes = ()
    permission_classes = ()
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer


class ReviewViewSet(viewsets.ModelViewSet):
    authentication_classes = ()
    permission_classes = ()
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
