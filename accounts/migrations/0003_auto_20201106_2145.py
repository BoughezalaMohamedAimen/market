# Generated by Django 3.1.1 on 2020-11-06 21:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_anonymoussession'),
    ]

    operations = [
        migrations.AlterField(
            model_name='anonymoussession',
            name='session',
            field=models.CharField(default='197e9d6f363b0bb97de06dcdc9e153d8', max_length=255, unique=True),
        ),
    ]
