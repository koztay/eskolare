from django.db.models.signals import pre_save

from slugify import slugify

from .models import Category


def category_pre_save_receiver(sender, instance, *args, **kwargs):
    print("receiver çalıştı sender =>", sender)
    if not instance.slug:
        print("slug yok")
        instance.slug = slugify(instance.title, to_lower=True)


pre_save.connect(category_pre_save_receiver, sender=Category)
