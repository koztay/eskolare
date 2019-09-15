from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model

User = get_user_model()


class Seller(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="seller_info")
    categories = models.ManyToManyField("categories.Category")
    title = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField(null=True, blank=True)
    web_site = models.URLField(null=True, blank=True)
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="likes", blank=True)
    dislikes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="dislikes", blank=True)

    class Meta:
        ordering = ("-id", )

    def __str__(self):
        return self.title

    def like_seller(self, user_id):
        try:
            user = User.objects.get(pk=user_id)
            self.dislikes.remove(user)
            self.likes.add(user)
        except User.DoesNotExist:
            raise ValueError("User bulunamadı, eklenemeyecek")

    def dislike_seller(self, user_id):
        try:
            user = User.objects.get(pk=user_id)
            self.likes.remove(user)
            self.dislikes.add(user)
        except User.DoesNotExist:
            raise ValueError("User bulunamadı, eklenemeyecek")


class Address(models.Model):
    # birden fazla şehirde şubesi varsa ekleyebilir o yüzden ForeignKey yaptık.
    seller = models.ForeignKey(Seller, on_delete=models.CASCADE, related_name="address")
    city = models.CharField(max_length=32)
    state = models.CharField(max_length=32)
    zipcode = models.CharField(max_length=5)
    address = models.TextField()

    def __str__(self):
        return f"{self.seller.title} adresi :{self.zipcode}, {self.state}, {self.city}"
