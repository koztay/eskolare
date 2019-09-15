from rest_framework import serializers
from categories.api.serializers import CategorySerializer
from categories.models import Category

from . import models


class AuthorSerializer(serializers.ModelSerializer):

    class Meta:
        fields = ('id', 'name')
        model = models.Author


class ReviewSerializer(serializers.ModelSerializer):

    class Meta:
        fields = ('id', 'review', 'book')
        model = models.Review


class BookSerializer(serializers.ModelSerializer):
    # authors = serializers.PrimaryKeyRelatedField(many=True, queryset=models.Author.objects.all())
    # categories = serializers.PrimaryKeyRelatedField(many=True, queryset=Category.objects.all())
    # reviews = serializers.PrimaryKeyRelatedField(many=True, queryset=models.Review.objects.all())
    authors = AuthorSerializer(many=True, read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        fields = ('id', 'title', 'description', 'image', 'categories', 'authors', 'reviews', 'read_by')
        read_only_fields = ('read_by', )
        model = models.Book

    def create(self, validated_data):
        print(validated_data)
        title = validated_data.get("title")
        description = validated_data.get("description")
        book_instance = models.Book(title=title, description=description)
        book_instance.save()
        return book_instance
