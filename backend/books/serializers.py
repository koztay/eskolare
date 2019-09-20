from rest_framework import serializers
from categories.api.serializers import CategorySerializer
from categories.models import Category

from . import models


class AuthorSerializer(serializers.ModelSerializer):
    """Serializer for authors"""
    class Meta:
        model = models.Author
        fields = ('id', 'name')
        read_only_fields = ('id', )


class ReviewSerializer(serializers.ModelSerializer):
    """Serializer for reviews"""
    class Meta:
        model = models.Review
        fields = ('id', 'review', 'book')
        read_only_fields = ('id', 'book')


class BookSerializer(serializers.ModelSerializer):
    """Serializer for books"""
    authors = serializers.PrimaryKeyRelatedField(many=True, queryset=models.Author.objects.all())
    categories = serializers.PrimaryKeyRelatedField(many=True, queryset=Category.objects.all())
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = models.Book
        fields = ('id', 'title', 'description', 'image', 'authors', 'categories', 'reviews', 'read_by')
        read_only_fields = ('read_by', 'id')

    def create(self, validated_data):
        print(validated_data)
        title = validated_data.get("title")
        description = validated_data.get("description")
        book_instance = models.Book(title=title, description=description)
        book_instance.save()
        return book_instance


class BookImageSerializer(serializers.ModelSerializer):
    """Serializer for uploading images to books"""

    class Meta:
        model = models.Book
        fields = ('id', 'image')
        read_only_fields = ('id',)
