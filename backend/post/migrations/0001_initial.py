# Generated by Django 3.1.2 on 2020-10-20 19:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_now_add=True)),
                ('title', models.CharField(max_length=100)),
                ('category', models.CharField(max_length=100)),
                ('price', models.IntegerField()),
                ('totalnum', models.IntegerField()),
                ('curnum', models.IntegerField(default=0)),
                ('dealtype', models.CharField(max_length=100)),
                ('content', models.TextField()),
                ('isshow', models.BooleanField(default=True)),
                ('image', models.ImageField(blank=True, upload_to='post_images')),
                ('writer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, to_field='username')),
            ],
        ),
    ]
