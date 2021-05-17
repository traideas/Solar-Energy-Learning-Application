# Generated by Django 3.1.7 on 2021-05-08 06:43

import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('is_student', models.BooleanField(default=False)),
                ('is_teacher', models.BooleanField(default=False)),
                ('is_admin', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Quiz',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=500)),
                ('start_date', models.DateField(auto_now_add=True)),
                ('total_marks', models.IntegerField()),
                ('description', models.CharField(max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='SchoolSection',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('section', models.PositiveSmallIntegerField(choices=[(1, 'First Standard'), (2, 'Second Standard'), (3, 'Third Standard'), (4, 'Fourth Standard'), (5, 'Fifth Standard'), (6, 'Sixth Standard'), (7, 'Seventh Standard'), (8, 'Eighth Standard'), (9, 'Ninth Standard'), (10, 'Tenth Standard'), (11, 'Eleventh Standard'), (12, 'Twelfth Standard')])),
                ('school_name', models.CharField(max_length=200)),
                ('student_count', models.IntegerField(default=1)),
            ],
        ),
        migrations.CreateModel(
            name='Teacher',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='studentportal.user')),
                ('institute_name', models.CharField(max_length=200)),
                ('is_verified', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField(max_length=1000)),
                ('options_1', models.CharField(max_length=500)),
                ('options_2', models.CharField(max_length=500)),
                ('options_3', models.CharField(max_length=500)),
                ('options_4', models.CharField(max_length=500)),
                ('answer', models.CharField(max_length=500)),
                ('mark', models.IntegerField()),
                ('quiz', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='questions', to='studentportal.quiz')),
            ],
        ),
        migrations.CreateModel(
            name='VideoMaterial',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=250)),
                ('file', models.FileField(blank=True, null=True, upload_to='')),
                ('description', models.CharField(blank=True, max_length=1000, null=True)),
                ('material_type', models.CharField(blank=True, max_length=1000, null=True)),
                ('upload_date', models.DateField(auto_now_add=True)),
                ('photo', models.FileField(blank=True, null=True, upload_to='')),
                ('status', models.BooleanField(default=False)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='videos', to='studentportal.teacher')),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='studentportal.user')),
                ('school_roll', models.CharField(max_length=10)),
                ('birth_date', models.DateField()),
                ('school_section', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='studentportal.schoolsection')),
            ],
        ),
        migrations.AddField(
            model_name='quiz',
            name='teacher',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='quizes', to='studentportal.teacher'),
        ),
        migrations.CreateModel(
            name='PPTXMaterial',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=250)),
                ('file', models.FileField(blank=True, null=True, upload_to='')),
                ('description', models.CharField(blank=True, max_length=1000, null=True)),
                ('material_type', models.CharField(blank=True, max_length=1000, null=True)),
                ('upload_date', models.DateField(auto_now_add=True)),
                ('photo', models.FileField(blank=True, null=True, upload_to='')),
                ('status', models.BooleanField(default=False)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pptx', to='studentportal.teacher')),
            ],
        ),
        migrations.CreateModel(
            name='DocMaterial',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=250)),
                ('file', models.FileField(blank=True, null=True, upload_to='')),
                ('description', models.CharField(blank=True, max_length=1000, null=True)),
                ('material_type', models.CharField(blank=True, max_length=1000, null=True)),
                ('upload_date', models.DateField(auto_now_add=True)),
                ('photo', models.FileField(blank=True, null=True, upload_to='')),
                ('status', models.BooleanField(default=False)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='docx', to='studentportal.teacher')),
            ],
        ),
    ]