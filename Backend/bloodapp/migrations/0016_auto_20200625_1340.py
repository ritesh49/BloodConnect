# Generated by Django 2.2 on 2020-06-25 08:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bloodapp', '0015_auto_20200625_1338'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userinfomodel',
            name='profile_image',
            field=models.ImageField(blank=True, default='profile_image.jpg', height_field='image_height', upload_to='profile_photo', width_field='image_width'),
        ),
    ]
