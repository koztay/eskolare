from django.test import TestCase

from ...models import Product


class TestModels(TestCase):
    def test_products_str(self):
        product = Product.objects.create(title="Kastamonu Siyez Buğday Ekmeği")

        self.assertEqual(str(product), product.title)
