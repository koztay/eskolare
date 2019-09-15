from rest_framework import serializers
from categories.api.serializers import CategorySerializer
from categories.models import Category

from . import models


class AuthorSerializer(serializers.ModelSerializer):

    class Meta:
        fields = ('id', 'name',)
        model = models.Author


class BookSerializer(serializers.ModelSerializer):
    authors = serializers.PrimaryKeyRelatedField(many=True, queryset=models.Author.objects.all())
    categories = serializers.PrimaryKeyRelatedField(many=True, queryset=Category.objects.all())

    class Meta:
        fields = ('id', 'title', 'description', 'image',  'categories', 'authors', 'reviews', 'read_by')
        model = models.Book


class ReviewSerializer(serializers.ModelSerializer):
    book = BookSerializer

    class Meta:
        fields = ('id', 'review', 'user', 'book')
        model = models.Review
