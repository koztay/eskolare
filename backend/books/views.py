
from rest_framework import permissions, viewsets, status
from rest_framework.decorators import action, authentication_classes, permission_classes
from rest_framework.response import Response


from .models import Author, Book, Review
from .permissions import IsAdminUserOrReadOnly, IsOwnerOrReadOnly
from .serializers import AuthorSerializer, BookSerializer, ReviewSerializer


class BookViewSet(viewsets.ModelViewSet):
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsAdminUserOrReadOnly
    )
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    @action(detail=True, methods=['put'], permission_classes=[permissions.IsAuthenticated])
    def add_to_read_list(self, request, pk=None):
        book = self.get_object()
        book.read_by.add(request.user)
        serializer = BookSerializer(book)
        return Response({'data': serializer.data})

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def read_by_me(self, request):
        read_books = Book.objects.filter(read_by__pk=request.user.pk)
        serializer = self.get_serializer(read_books, many=True)
        return Response(serializer.data)


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
