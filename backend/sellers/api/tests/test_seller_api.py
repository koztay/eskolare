from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from ...models import Seller, Address
from ..serializers import SellerSerializer


SELLERS_URL = reverse('seller:seller-list')


def detail_url(seller_id):
    """Return seller detail url"""
    return reverse('seller:seller-detail', args=[seller_id])


def seller_like_url(seller_id):
    """Return seller like url"""
    return reverse('seller:seller-like', args=[seller_id])


def seller_dislike_url(seller_id):
    """Return seller dislike url"""
    return reverse('seller:seller-dislike', args=[seller_id])


def sample_address(seller, **params):
    defaults = {

    }
    defaults.update(params)
    return Address.objects.create(seller=seller, **defaults)


def sample_seller(user, **params):

    defaults = {
        "title": "Bandırma Organik Pazarı",
        "phone_number": "266 711 7171"
    }
    defaults.update(params)
    return Seller.objects.create(user=user, **defaults)


class PublicSellerApiTests(APITestCase):
    """Test unauthenticated seller API access"""

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            'user1', 'test_pass'
        )

    def test_retrieve_sellers(self):
        """Test retrieving a list of sellers"""
        sample_seller(user=self.user)
        user2 = get_user_model().objects.create_user(
            'user2', 'test_pass'
        )
        sample_seller(user=user2, title="Sample Seller", phone_number="22333333333")

        response = self.client.get(SELLERS_URL)

        sellers = Seller.objects.all().order_by("-id")
        serializer = SellerSerializer(sellers, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('results'), serializer.data)

    def test_retrieve_seller_detail(self):
        """Test retrieving a single seller"""
        seller = sample_seller(user=self.user)
        url = detail_url(seller.pk)

        res = self.client.get(url)

        serializer = SellerSerializer(seller)
        self.assertEqual(res.data, serializer.data)

    def test_retrieve_seller_not_exist(self):
        url = detail_url(99)
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)


class PrivateSellerApiTests(APITestCase):
    """Test authenticated seller API access"""

    def setUp(self):
        self.client = APIClient()
        self.user1 = get_user_model().objects.create_user(
            'user1', 'test_pass'
        )
        self.user2 = get_user_model().objects.create_user(
            'user2', 'test_pass'
        )
        # this is for like/dislike test

    def test_like_dislike_for_authenticated_users(self):
        self.client.force_authenticate(self.user2)
        seller = sample_seller(user=self.user1)
        url = seller_like_url(seller.pk)

        seller.likes.clear()
        seller.dislikes.clear()

        self.client.patch(url)

        seller.refresh_from_db()
        self.assertEqual(seller.likes.all().count(), 1)
        self.assertEqual(seller.dislikes.all().count(), 0)

        url = seller_dislike_url(seller.pk)
        self.client.patch(url)

        seller.refresh_from_db()
        self.assertEqual(seller.likes.all().count(), 0)
        self.assertEqual(seller.dislikes.all().count(), 1)

    def test_like_dislike_for_unauthenticated_users(self):
        self.client.logout()  # logout olmazsan ilk user login olduğu için o user
        seller = sample_seller(user=self.user1)
        url = seller_like_url(seller.pk)

        res = self.client.patch(url)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_like_dislike_for_seller_nonexist(self):
        self.client.force_authenticate(self.user2)

        url = seller_like_url(99)

        res = self.client.patch(url)
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)
