from rest_framework import serializers

from ..models import Seller, Address


class AddressSerializer(serializers.ModelSerializer):
    """Serializer for Addresses of sellers"""

    class Meta:
        model = Address
        fields = ('city', 'state', 'zipcode', 'address')


class SellerSerializer(serializers.ModelSerializer):
    """Serializer for Sellers"""
    address = AddressSerializer(read_only=True, many=True)

    class Meta:
        fields = ('title', 'likes', 'dislikes', 'phone_number', 'email', 'web_site', 'address')
        model = Seller
