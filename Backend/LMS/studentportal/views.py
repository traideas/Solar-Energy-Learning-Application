from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import FileUploadParser

from .serializers import *
# Create your views here.
from rest_framework import permissions
from rest_framework import renderers
from rest_framework.response import Response
from .models import *
from rest_framework import generics
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token



from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status






class UserAuthentication(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'is_student': user.is_student,
            'is_teacher': user.is_teacher,
            'is_admin': user.is_admin,
        })



class AdminList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = AdminSerializer


class AdminDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = AdminSerializer






class SchoolList(generics.ListCreateAPIView):
    queryset = SchoolSection.objects.all()
    serializer_class = SchoolSerializer




class SchoolDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = SchoolSection.objects.all()
    serializer_class = SchoolSerializer



class StudentList(generics.ListCreateAPIView):
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly,
    #                       IsOwnerOrReadOnly]

    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    # def perform_create(self, serializer):
    #     instance = serializer.save()
    #     instance.set_password(instance.password)
    #     instance.save()



class StudentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


    def perform_destroy(self, instance):
        user = instance.user
        school_section = instance.school_section
        user.delete()
        instance.delete()
        print(school_section.school_name)

        try:

            school_section.student_count = school_section.student_count - 1
            school_section.save()
        except:
            pass




class TeacherList(generics.ListCreateAPIView):
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly,
    #                       IsOwnerOrReadOnly]
    queryset = Teacher.objects.filter(is_verified=True).all()
    serializer_class = TeacherSerializer

    # def perform_create(self, serializer):
    #     instance = serializer.save()
    #     instance.set_password(instance.password)
    #     instance.save()


class TeacherListAll(generics.ListCreateAPIView):
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly,
    #                       IsOwnerOrReadOnly]
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer


class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer

    def perform_destroy(self, instance):
        user = instance.user
        user.delete()
        instance.delete()



class VideoList(generics.ListCreateAPIView):
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly,
    #                       IsOwnerOrReadOnly]
    queryset = VideoMaterial.objects.all().order_by('-id')
    serializer_class = VideoSerializer


class VideoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = VideoMaterial.objects.all()
    serializer_class = VideoSerializer




class PPTXList(generics.ListCreateAPIView):
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly,
    #                       IsOwnerOrReadOnly]
    queryset = PPTXMaterial.objects.all().order_by('-id')
    serializer_class = PPTXSerializer


class PPTXDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = PPTXMaterial.objects.all()
    serializer_class = PPTXSerializer



class DocList(generics.ListCreateAPIView):
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly,
    #                       IsOwnerOrReadOnly]
    queryset = DocMaterial.objects.all().order_by('-id')
    serializer_class = DocSerializer


class DocDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = DocMaterial.objects.all()
    serializer_class = DocSerializer



class QuizList(generics.ListCreateAPIView):
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly,
    #                       IsOwnerOrReadOnly]
    queryset = Quiz.objects.all().order_by('-start_date')
    serializer_class = QuizSerializer


class QuizDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer


class QuestionList(generics.ListCreateAPIView):
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly,
    #                       IsOwnerOrReadOnly]
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class QuestionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer



class DiscussionList(generics.ListCreateAPIView):
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly,
    #                       IsOwnerOrReadOnly]
    # user = None
    # print(user)
    queryset = Discussion.objects.all().order_by('-id')
    serializer_class = DiscussionSerializer
    # print(self.request.user)

    def list(self, request):
        # Note the use of `get_queryset()` instead of `self.queryset`
        # queryset = self.get_queryset()
        creator = request.user
        school = None
        try:
            if(creator.is_admin):
                queryset = Discussion.objects.all().order_by('-id')
                serializer = DiscussionSerializer(queryset, many=True)
                return Response(serializer.data)
        except:
            pass
        try:
            if (creator.is_student):
                student = Student.objects.get(pk=creator.id)
                school = SchoolSection.objects.get(pk=student.school_section.id)

            elif creator.is_teacher:
                teacher = Teacher.objects.get(pk=creator.id)
                school = SchoolSection.objects.get(pk=teacher.institute_name.id)
            queryset = Discussion.objects.filter(school=school.id).all().order_by('-id')
        except:
            queryset = []

        serializer = DiscussionSerializer(queryset, many=True)
        return Response(serializer.data)



class DiscussionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Discussion.objects.all()
    serializer_class = DiscussionSerializer




class CommentList(generics.ListCreateAPIView):
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly,
    #                       IsOwnerOrReadOnly]
    queryset = Comment.objects.all().order_by('-id')
    serializer_class = CommentSerializer


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class ScoreList(generics.ListCreateAPIView):
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly,
    #                       IsOwnerOrReadOnly]
    queryset = Score.objects.all()
    serializer_class = ScoreSerializer


class ScoreDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Score.objects.all()
    serializer_class = ScoreSerializer