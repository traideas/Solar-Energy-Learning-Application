# Generated by Django 3.1.7 on 2021-06-05 22:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('studentportal', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='schoolsection',
            name='section',
        ),
        migrations.RemoveField(
            model_name='student',
            name='birth_date',
        ),
        migrations.AddField(
            model_name='user',
            name='photo',
            field=models.FileField(blank=True, null=True, upload_to=''),
        ),
    ]