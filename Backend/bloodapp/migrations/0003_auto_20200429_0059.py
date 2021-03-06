# Generated by Django 2.2 on 2020-04-28 19:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bloodapp', '0002_auto_20200414_0115'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usermodel',
            name='activeMedications',
        ),
        migrations.RemoveField(
            model_name='usermodel',
            name='comments',
        ),
        migrations.RemoveField(
            model_name='usermodel',
            name='drugist',
        ),
        migrations.RemoveField(
            model_name='usermodel',
            name='isDonor',
        ),
        migrations.RemoveField(
            model_name='usermodel',
            name='isFrequent',
        ),
        migrations.RemoveField(
            model_name='usermodel',
            name='isReceiver',
        ),
        migrations.AddField(
            model_name='usermodel',
            name='birth_date',
            field=models.DateField(default='2020-04-29'),
        ),
        migrations.AddField(
            model_name='usermodel',
            name='blood_dr',
            field=models.CharField(default='', max_length=8),
        ),
        migrations.AddField(
            model_name='usermodel',
            name='gender',
            field=models.CharField(default='', max_length=8),
        ),
        migrations.AddField(
            model_name='usermodel',
            name='height',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='usermodel',
            name='phone_no',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='usermodel',
            name='weight',
            field=models.IntegerField(default=0),
        ),
    ]
