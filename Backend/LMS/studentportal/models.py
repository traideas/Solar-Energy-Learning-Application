from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

import os

class User(AbstractUser):
    is_student = models.BooleanField(default=False)
    is_teacher = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    photo = models.FileField(blank=True, null=True)

    # def filename(self):
    #     return os.path.basename(self.photo.name)

    def __str__(self):
        # user = {
        #     username: ,
        #     photo:
        # }
        return self.username


class SchoolSection(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
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
    def __str__(self):
        return self.school_name



class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    school_section = models.ForeignKey(SchoolSection, on_delete=models.CASCADE, related_name='students')
    school_roll = models.CharField(max_length=10)


    # birth_date = models.DateField(blank=False)
    def __str__(self):
        return self.user.first_name +" "+ self.user.last_name



class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    institute_name = models.ForeignKey(SchoolSection, on_delete=models.CASCADE, related_name='teachers')
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.user.first_name + " " + self.user.last_name






class VideoMaterial(models.Model):
    title = models.CharField(blank=False, max_length=250)
    school = models.ForeignKey(SchoolSection, on_delete=models.CASCADE, related_name='school_video', blank=True, null =True)
    file = models.FileField(blank=True, null=True)
    description = models.CharField(blank=True, max_length=1000, null=True)
    material_type = models.CharField(blank=True, max_length=1000, null=True)
    upload_date = models.DateField(blank=False, auto_now_add=True)
    created_by = models.ForeignKey('studentportal.User', on_delete=models.CASCADE, related_name='videos')
    photo = models.FileField(blank=True, null=True)
    status = models.BooleanField(default=False)
    public = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class PPTXMaterial(models.Model):
    title = models.CharField(blank=False, max_length=250)
    school = models.ForeignKey(SchoolSection, on_delete=models.CASCADE, related_name='school_pptx', blank=True, null =True)
    file = models.FileField(blank=True, null=True)
    description = models.CharField(blank=True, max_length=1000, null=True)
    material_type = models.CharField(blank=True, max_length=1000, null=True)
    upload_date = models.DateField(blank=False, auto_now_add=True)
    created_by = models.ForeignKey('studentportal.User', on_delete=models.CASCADE, related_name='pptx')
    photo = models.FileField(blank=True, null=True)
    status = models.BooleanField(default=False)
    public = models.BooleanField(default=False)

    def __str__(self):
        return self.title

class DocMaterial(models.Model):
    title = models.CharField(blank=False, max_length=250)
    school = models.ForeignKey(SchoolSection, on_delete=models.CASCADE, related_name='school_docx', blank=True, null =True)
    file = models.FileField(blank=True, null=True)
    description = models.CharField(blank=True, max_length=1000, null=True)
    material_type = models.CharField(blank=True, max_length=1000, null=True)
    upload_date = models.DateField(blank=False, auto_now_add=True)
    created_by = models.ForeignKey('studentportal.User', on_delete=models.CASCADE, related_name='docx')
    photo = models.FileField(blank=True, null=True)
    status = models.BooleanField(default=False)
    public = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class Quiz(models.Model):
    created_by = models.ForeignKey('studentportal.User', related_name='quizes', on_delete=models.CASCADE)
    school = models.ForeignKey(SchoolSection, on_delete=models.CASCADE, related_name='school_quiz', blank=True, null=True)
    public = models.BooleanField(default=False)
    # student = models.ForeignKey('studentportal.CourseTeacher', related_name='tests', on_delete=models.CASCADE)
    # time_duration = models.IntegerField()
    photo = models.FileField(blank=True, null=True)
    title = models.CharField(max_length=500)
    start_date = models.DateField(auto_now_add=True)
    total_marks = models.IntegerField()
    description = models.CharField(max_length=1000)

    def __str__(self):
        return self.title


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

    def __str__(self):
        return self.question



class Discussion(models.Model):
    title = models.CharField(max_length=1000)
    description = models.CharField(max_length=5000)
    created_by = models.ForeignKey('studentportal.User', on_delete=models.CASCADE, related_name='discussions')
    school = models.ForeignKey(SchoolSection, on_delete=models.CASCADE, related_name='school_discussions', blank=True)
    created_date = models.DateField(blank=False, auto_now_add=True)
    status = models.BooleanField(default=False)
    file = models.FileField(blank=True, null=True)

    def __str__(self):
        return self.title


class Comment(models.Model):
    discussion = models.ForeignKey('studentportal.Discussion', on_delete=models.CASCADE, related_name='comments')
    comment = models.CharField(max_length=2000)
    created_by = models.ForeignKey('studentportal.User', on_delete=models.CASCADE, related_name='comments')
    created_date = models.DateField(blank=False, auto_now_add=True)

    def __str__(self):
        return self.comment

class Score(models.Model):
    student = models.ForeignKey('studentportal.Student', on_delete=models.CASCADE, related_name='studentScore')
    quiz = models.ForeignKey('studentportal.Quiz', related_name='quizScore', on_delete=models.CASCADE)
    totalQuestion = models.IntegerField()
    totalMarks = models.IntegerField()
    right = models.IntegerField()
    wrong = models.IntegerField()
    score = models.IntegerField()
    date = models.DateField(blank=False, auto_now_add=True)

    # class Meta:
    #     constraints = [
    #         models.UniqueConstraint(fields=['student', 'quiz'],
    #                                 name='unique_student_quiz'),
    #     ]