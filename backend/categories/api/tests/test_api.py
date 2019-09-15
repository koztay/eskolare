from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from ...models import Category
from ..serializers import CategorySerializer

CATEGORIES_URL = reverse('category:category-list')


class PublicCategoriesAPiTest(TestCase):
    """Test the publicly available categories API"""

    def setUp(self):
        self.client = APIClient()

    def test_retrieve_categories(self):
        """Test retrieving categories"""
        Category.objects.create(title="Ekmekler")
        Category.objects.create(title="Peynirler")

        res = self.client.get(CATEGORIES_URL)

        categories = Category.objects.all()  # order_by ekleyince sıralama değiştiği için patlıyor
        serializer = CategorySerializer(categories, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data.get('results'), serializer.data)
        # response.data ile karşılaştıramıyoruz çünkü pagination nedeniyle...
