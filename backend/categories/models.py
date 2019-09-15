import uuid
from django.db import models
from mptt.models import MPTTModel, TreeForeignKey
from sorl.thumbnail import ImageField


def category_image_file_path(instance, filename):
    """Generate file path for new category image"""
    ext = filename.split('.')[-1]
    filename = f'{uuid.uuid4()}.{ext}'
    return f'uploads/category/{filename}'


class Category(MPTTModel):
    parent = TreeForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')
    title = models.CharField(max_length=120)
    slug = models.SlugField(max_length=240)
    description = models.TextField(null=True, blank=True)
    active = models.BooleanField(default=True)
    show_on_homepage = models.BooleanField(default=True)
    image = ImageField(upload_to=category_image_file_path, blank=True, null=True)

    class MPTTMeta:
        order_insertion_by = ['title']

    class Meta:
        verbose_name_plural = 'Categories'

    def __str__(self):
        return f"{self.title}"

    # def get_product_count(self):
    #     category_products = Product.objects.filter(categories=self)
    #     return category_products.count()
