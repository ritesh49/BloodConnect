# Generated by Django 2.2 on 2020-06-24 04:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bloodapp', '0008_userinfomodel_profile_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userinfomodel',
            name='profile_image',
            field=models.ImageField(blank=True, default='profile_image.jpg', height_field=200, upload_to='profile_photo', width_field=200),
        ),
    ]
