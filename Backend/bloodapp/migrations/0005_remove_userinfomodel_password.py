# Generated by Django 2.2 on 2020-04-29 07:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bloodapp', '0004_auto_20200429_1301'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userinfomodel',
            name='password',
        ),
    ]
