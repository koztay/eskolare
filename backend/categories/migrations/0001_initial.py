# Generated by Django 2.2.2 on 2019-07-14 12:05

import categories.models
from django.db import migrations, models
import django.db.models.deletion
import mptt.fields
import sorl.thumbnail.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=120)),
                ('slug', models.SlugField(max_length=240)),
                ('description', models.TextField(blank=True, null=True)),
                ('active', models.BooleanField(default=True)),
                ('show_on_homepage', models.BooleanField(default=True)),
                ('image', sorl.thumbnail.fields.ImageField(blank=True, null=True, upload_to=categories.models.category_image_file_path)),
                ('lft', models.PositiveIntegerField(editable=False)),
                ('rght', models.PositiveIntegerField(editable=False)),
                ('tree_id', models.PositiveIntegerField(db_index=True, editable=False)),
                ('level', models.PositiveIntegerField(editable=False)),
                ('parent', mptt.fields.TreeForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='children', to='categories.Category')),
            ],
            options={
                'verbose_name_plural': 'Categories',
            },
        ),
    ]
