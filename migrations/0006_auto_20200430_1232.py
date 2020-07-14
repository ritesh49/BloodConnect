# Generated by Django 2.2 on 2020-04-30 07:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bloodapp', '0005_remove_userinfomodel_password'),
    ]

    operations = [
        migrations.AddField(
            model_name='userinfomodel',
            name='first_name',
            field=models.CharField(default='', max_length=20),
        ),
        migrations.AddField(
            model_name='userinfomodel',
            name='last_name',
            field=models.CharField(default='', max_length=20),
        ),
        migrations.AlterField(
            model_name='userinfomodel',
            name='blood_dr',
            field=models.CharField(default='', max_length=4),
        ),
        migrations.AlterField(
            model_name='userinfomodel',
            name='username',
            field=models.CharField(default='', max_length=50),
        ),
    ]