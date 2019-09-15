import uuid

from django.test import TestCase
from django.contrib.auth import get_user_model

from ...models import Seller, Address


def create_user(**params):
    return get_user_model().objects.create_user(**params)


class SellerModelsTest(TestCase):
    def setUp(self):
        payload = {'username': 'testuser', 'password': 'testpass'}
        self.user = create_user(**payload)
        self.seller = Seller.objects.create(title="Ayşe Abla Organik Ürünler", user=self.user)

    def test_str(self):
        """Tests Seller string representation"""
        self.assertEqual(str(self.seller), self.seller.title)

    def test_like_dislike_seller(self):
        """Tests adding/removing of users to likes and dislikes"""
        payload1 = {'username': 'user1', 'password': 'testpass'}
        user1 = create_user(**payload1)
        payload2 = {'username': 'user2', 'password': 'testpass'}
        user2 = create_user(**payload2)
        self.seller.like_seller(user1.pk)
        self.seller.like_seller(user2.pk)

        self.assertTrue(user1 in self.seller.likes.all())
        self.assertTrue(user2 in self.seller.likes.all())
        self.assertEqual(self.seller.likes.all().count(), 2)

        self.seller.dislike_seller(user1.pk)
        self.assertTrue(user1 not in self.seller.likes.all())
        self.assertTrue(user1 in self.seller.dislikes.all())
        self.assertEqual(self.seller.likes.all().count(), 1)
        self.assertEqual(self.seller.dislikes.all().count(), 1)

    def test_user_like_dislike_without_user(self):
        """Test nonexisiting users cannot added to likes and dislikes"""
        with self.assertRaises(ValueError):
            self.seller.like_seller(uuid.uuid4())

        with self.assertRaises(ValueError):
            self.seller.dislike_seller(uuid.uuid4())


class AddressModelsTest(TestCase):
    def test_str(self):
        """Tests Address string reprersentation"""
        payload = {'username': 'testuser', 'password': 'testpass'}
        user = create_user(**payload)
        seller = Seller.objects.create(title="Ayşe Abla Organik Ürünler", user=user)
        address = Address.objects.create(
            seller=seller,
            city="İstanbul",
            state="Kadıköy",
            zipcode="34352",
            address="Cefarağa Mah. Fener sok. No:52"
        )

        self.assertEqual(str(address), f"{seller.title} adresi :{address.zipcode}, {address.state}, {address.city}")
