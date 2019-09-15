from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.conf import settings
from sorl.thumbnail import ImageField


def book_image_file_path(instance, filename):
    """Generate file path for new book image"""
    ext = filename.split('.')[-1]
    filename = f'{uuid.uuid4()}.{ext}'
    return f'uploads/book-images/{filename}'


class Author(models.Model):
    name = models.CharField(max_length=150)

    class Meta:
        verbose_name = _("Author")
        verbose_name_plural = _("Authors")

    def __str__(self):
        return self.name


class Book(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField(_("description"))
    categories = models.ManyToManyField("categories.Category", verbose_name=_("Categories"))
    authors = models.ManyToManyField(Author, verbose_name=_("Authors"))
    read_by = models.ManyToManyField(settings.AUTH_USER_MODEL, verbose_name=_("Read By"), blank=True, null=True)
    image = ImageField(upload_to=book_image_file_path, blank=True, null=True)

    class Meta:
        verbose_name = _("Book")
        verbose_name_plural = _("Books")

    def __str__(self):
        return self.name


class Review(models.Model):
    review = models.TextField(_("Review"))
    user = models.ManyToManyField(settings.AUTH_USER_MODEL, verbose_name=_("User"))
    book = models.ForeignKey(Book, related_name='reviews', on_delete=models.CASCADE)

    class Meta:
        verbose_name = _("Review")
        verbose_name_plural = _("Reviews")

    def __str__(self):
        return self.name

    # def get_absolute_url(self):
    #     return reverse("Review_detail", kwargs={"pk": self.pk})
