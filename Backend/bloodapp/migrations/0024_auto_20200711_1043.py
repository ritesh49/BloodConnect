# Generated by Django 2.2 on 2020-07-11 10:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bloodapp', '0023_auto_20200703_1650'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='verification_key',
            field=models.CharField(blank=True, max_length=256),
        ),
        migrations.AlterField(
            model_name='profile',
            name='activation_key',
            field=models.CharField(blank=True, max_length=256),
        ),
    ]
