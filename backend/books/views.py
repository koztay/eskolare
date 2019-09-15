from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action, authentication_classes, permission_classes
from rest_framework.response import Response

from categories.models import Category

from .models import Author, Book, Review
from .permissions import IsAdminUserOrReadOnly, IsOwnerOrReadOnly
from .serializers import AuthorSerializer, BookSerializer, ReviewSerializer


class BookViewSet(viewsets.ModelViewSet):
    """
    {
        "title": "test title",
        "description": "test description",
        "image": null,
        "categories": [1,2],
        "authors": [1],
        "reviews": [],
        "read_by": []
    }
    """

    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsAdminUserOrReadOnly
    )
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    @action(detail=True, methods=['put'], permission_classes=[permissions.IsAuthenticated], url_path='add-to-read-list')
    def add_to_read_list(self, request, pk=None):
        book = self.get_object()
        book.read_by.add(request.user)
        serializer = BookSerializer(book)
        return Response({'data': serializer.data})

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated], url_path='read-by-me')
    def read_by_me(self, request):
        read_books = Book.objects.filter(read_by__pk=request.user.pk)
        serializer = self.get_serializer(read_books, many=True)
        return Response(serializer.data)

    @action(methods=['post'], detail=True, url_path='upload-image')
    def upload_image(self, request, pk=None):
        """Upload an image to a book"""
        book = self.get_object()
        serializer = self.get_serializer(
            book,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    @action(methods=['post'], detail=True, permission_classes=[IsAdminUserOrReadOnly], url_path='set-authors')
    def set_authors(self, request, pk=None):
        book = self.get_object()
        authors_pk_list = request.data.get("authors")
        book.authors.clear()
        qs = Author.objects.filter(pk__in=authors_pk_list)
        book.authors.add(*qs)
        serializer = BookSerializer(book)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    @action(methods=['post'], detail=True, permission_classes=[IsAdminUserOrReadOnly], url_path='set-categories')
    def set_categories(self, request, pk=None):
        book = self.get_object()
        categories_pk_list = request.data.get("categories")
        book.categories.clear()
        qs = Category.objects.filter(pk__in=categories_pk_list)
        book.categories.add(*qs)
        serializer = BookSerializer(book)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


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

    def create(self, request):
        user = request.user
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response({'data': serializer.data})
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)
