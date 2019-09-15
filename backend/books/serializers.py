from rest_framework import serializers
from categories.api.serializers import CategorySerializer

from . import models


class AuthorSerializer(serializers.ModelSerializer):

    class Meta:
        fields = ('id', 'name',)
        model = models.Author


class BookSerializer(serializers.ModelSerializer):
    authors = AuthorSerializer()
    categories = CategorySerializer()

    class Meta:
        fields = ('id', 'title', 'description', 'categories',  'authors', 'read_by')
        model = models.Book


class ReviewSerializer(serializers.ModelSerializer):
    book = BookSerializer

    class Meta:
        fields = ('id', 'review', 'user', 'book')
        model = models.Review
