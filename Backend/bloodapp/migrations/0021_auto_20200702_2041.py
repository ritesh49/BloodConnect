# Generated by Django 2.2 on 2020-07-02 15:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('bloodapp', '0020_auto_20200626_1359'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chatmessage',
            name='is_online',
            field=models.BooleanField(blank=True, default=False),
        ),
        migrations.AlterField(
            model_name='chatmessage',
            name='is_typing',
            field=models.BooleanField(blank=True, default=False),
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activation_key', models.CharField(max_length=40)),
                ('key_expires', models.DateTimeField()),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]