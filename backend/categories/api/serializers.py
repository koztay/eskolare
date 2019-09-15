from rest_framework import serializers

from ..models import Category


class RecursiveSerializer(serializers.Serializer):
    """Serializer for recursive field for subcategories"""

    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for Category objects"""
    children = RecursiveSerializer(many=True, source='get_children', read_only=True)

    class Meta:
        model = Category
        fields = ('id', 'parent', 'title', 'children')

    def get_children(self, obj):
        return Category.objects.filter(parent=obj)
