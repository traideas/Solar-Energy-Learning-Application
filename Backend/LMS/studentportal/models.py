from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.



class User(AbstractUser):
    is_student = models.BooleanField(default=False)
    is_teacher = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)

class SchoolSection(models.Model):
    # Section_Choices = (
    #     (1, 'First Standard'),
    #     (2, 'Second Standard'),
    #     (3, 'Third Standard'),
    #     (4, 'Fourth Standard'),
    #     (5, 'Fifth Standard'),
    #     (6, 'Sixth Standard'),
    #     (7, 'Seventh Standard'),
    #     (8, 'Eighth Standard'),
    #     (9, 'Ninth Standard'),
    #     (10, 'Tenth Standard'),
    #     (11, 'Eleventh Standard'),
    #     (12, 'Twelfth Standard'),
    # )
    # section = models.PositiveSmallIntegerField(choices=Section_Choices)
    # section = models.CharField(max_length=50)
    school_name = models.CharField(max_length=200)
    student_count = models.IntegerField(default=1)



class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    school_section = models.ForeignKey(SchoolSection, on_delete=models.CASCADE)
    school_roll = models.CharField(max_length=10)
    # birth_date = models.DateField(blank=False)



class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    institute_name = models.CharField(max_length=200)
    is_verified = models.BooleanField(default=False)





class VideoMaterial(models.Model):
    title = models.CharField(blank=False, max_length=250)
    file = models.FileField(blank=True, null=True)
    description = models.CharField(blank=True, max_length=1000, null=True)
    material_type = models.CharField(blank=True, max_length=1000, null=True)
    upload_date = models.DateField(blank=False, auto_now_add=True)
    created_by = models.ForeignKey('studentportal.Teacher', on_delete=models.CASCADE, related_name='videos')
    photo = models.FileField(blank=True, null=True)
    status = models.BooleanField(default=False)



class PPTXMaterial(models.Model):
    title = models.CharField(blank=False, max_length=250)
    file = models.FileField(blank=True, null=True)
    description = models.CharField(blank=True, max_length=1000, null=True)
    material_type = models.CharField(blank=True, max_length=1000, null=True)
    upload_date = models.DateField(blank=False, auto_now_add=True)
    created_by = models.ForeignKey('studentportal.Teacher', on_delete=models.CASCADE, related_name='pptx')
    photo = models.FileField(blank=True, null=True)
    status = models.BooleanField(default=False)


class DocMaterial(models.Model):
    title = models.CharField(blank=False, max_length=250)
    file = models.FileField(blank=True, null=True)
    description = models.CharField(blank=True, max_length=1000, null=True)
    material_type = models.CharField(blank=True, max_length=1000, null=True)
    upload_date = models.DateField(blank=False, auto_now_add=True)
    created_by = models.ForeignKey('studentportal.Teacher', on_delete=models.CASCADE, related_name='docx')
    photo = models.FileField(blank=True, null=True)
    status = models.BooleanField(default=False)



class Quiz(models.Model):
    teacher = models.ForeignKey('studentportal.Teacher', related_name='quizes', on_delete=models.CASCADE)
    # student = models.ForeignKey('studentportal.CourseTeacher', related_name='tests', on_delete=models.CASCADE)
    # time_duration = models.IntegerField()
    photo = models.FileField(blank=True, null=True)
    title = models.CharField(max_length=500)
    start_date = models.DateField(auto_now_add=True)
    total_marks = models.IntegerField()
    description = models.CharField(max_length=1000)



# class Examinee(models.Model):
#     student = models.ForeignKey('studentportal.Student', on_delete=models.CASCADE)
#     coursetest = models.ForeignKey('studentportal.CourseTest', on_delete=models.CASCADE,
#                                    related_name='examinees')
#     attending_date = models.DateField(auto_now_add=True)
#     score = models.IntegerField()
#     right = models.IntegerField()
#     wrong = models.IntegerField()






class Question(models.Model):
    option_Choices = (
        (1, 'options 1'),
        (2, 'options 2'),
        (3, 'options 3'),
        (4, 'options 4'),
    )
    quiz = models.ForeignKey('studentportal.Quiz', related_name='questions', on_delete=models.CASCADE)
    question = models.CharField(max_length=1000)
    options_1 = models.CharField(max_length=500)
    options_2 = models.CharField(max_length=500)
    options_3 = models.CharField(max_length=500)
    options_4 = models.CharField(max_length=500)
    answer = models.PositiveSmallIntegerField(choices=option_Choices)
    mark = models.IntegerField()




class Discussion(models.Model):
    title = models.CharField(max_length=1000)
    description = models.CharField(max_length=5000)
    created_by = models.ForeignKey('studentportal.User', on_delete=models.CASCADE, related_name='discussions')
    created_date = models.DateField(blank=False, auto_now_add=True)
    status = models.BooleanField(default=False)



class Comment(models.Model):
    discussion = models.ForeignKey('studentportal.Discussion', on_delete=models.CASCADE, related_name='comments')
    comment = models.CharField(max_length=2000)
    created_by = models.ForeignKey('studentportal.User', on_delete=models.CASCADE, related_name='comments')
    created_date = models.DateField(blank=False, auto_now_add=True)
