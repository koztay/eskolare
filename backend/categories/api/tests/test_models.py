from unittest.mock import patch

from django.test import TestCase

# from categories.models import Category, category_image_file_path

from ...models import Category, category_image_file_path


class ModelTests(TestCase):
    def test_category_str(self):
        """Test category string representation"""
        category = Category.objects.create(
            title="Test Category - Yeni kategori"
        )

        self.assertEqual(str(category), category.title)

    @patch("uuid.uuid4")
    def test_category_file_name_uuid(self, mock_uuid):
        """Test that image is saved in the correct location"""
        uuid = "test-uuid"
        mock_uuid.return_value = uuid
        file_path = category_image_file_path(None, "myimage.jpg")

        expected_path = f"uploads/category/{uuid}.jpg"
        self.assertEqual(file_path, expected_path)
