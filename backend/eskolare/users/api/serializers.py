
from rest_framework import serializers
from django.contrib.auth import get_user_model


class UserDisplaySerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = [
            'username',
            'email',
            'pk',
            'is_staff',
            'is_superuser',
            'is_active'
        ]
