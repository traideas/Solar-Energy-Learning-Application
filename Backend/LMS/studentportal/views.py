from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import FileUploadParser
from django.db.models import Q
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
from .permission import *





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
    permission_classes = [UniversalPermission]
    queryset = SchoolSection.objects.all()
    serializer_class = SchoolSerializer




class SchoolDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, AdminPermission]
    queryset = SchoolSection.objects.all()
    serializer_class = SchoolSerializer



class StudentList(generics.ListCreateAPIView):
    permission_classes = [UniversalPermission]
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    # def list(self, request):
    #
    #     user = request.user
    #     school = None
    #     try:
    #         if (user.is_admin):
    #             queryset = Student.objects.all().order_by('-id')
    #             serializer = StudentSerializer(queryset, many=True)
    #             return Response(serializer.data)
    #     except:
    #         queryset = []
    #         pass
    #
    #     # try:
    #     if (user.is_student):
    #         print(1)
    #         student = Student.objects.get(pk=user.id)
    #         print(student)
    #         print(student)
    #         print(student)
    #         school = SchoolSection.objects.get(pk=student.school_section.id)
    #         print(school)
    #     elif user.is_teacher:
    #         teacher = Teacher.objects.get(pk=user.id)
    #         school = SchoolSection.objects.get(pk=teacher.institute_name.id)
    #     print("good")
    #     queryset = Student.objects.all().order_by('-id')
    #     print("good")
    #     print(5)
    #     # except:
    #     #     print(6)
    #     #     queryset = []
    #     #     pass
    #     serializer = StudentSerializer(queryset, many=True)
    #     print("good")
    #     return Response(serializer.data)




class StudentDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsUser]
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
    permission_classes = [UniversalPermission]
    queryset = Teacher.objects.filter(is_verified=True).all()
    serializer_class = TeacherSerializer

    # def perform_create(self, serializer):
    #     instance = serializer.save()
    #     instance.set_password(instance.password)
    #     instance.save()


class TeacherListAll(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                          AdminPermission]
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer


class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsUser]

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

    def list(self, request):
        user = request.user

        school = None
        try:
            if (user.is_admin):
                queryset = VideoMaterial.objects.all().order_by('-id')
                serializer = VideoSerializer(queryset, many=True)
                return Response(serializer.data)
        except:
            queryset = []
            pass

        try:
            if (user.is_student):
                student = Student.objects.get(pk=user.id)
                school = SchoolSection.objects.get(pk=student.school_section.id)

            elif user.is_teacher:
                teacher = Teacher.objects.get(pk=user.id)
                school = SchoolSection.objects.get(pk=teacher.institute_name.id)
            queryset = VideoMaterial.objects.filter(Q(school=school.id) | Q(public=True)).all().order_by('-id')

        except:
            queryset = []
            pass
        serializer = VideoSerializer(queryset, many=True)
        return Response(serializer.data)




class VideoDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                           IsCreatedBy]
    queryset = VideoMaterial.objects.all()
    serializer_class = VideoSerializer

    # def list(self, request):
    #     user = request.user
    #     try:
    #         if (user.is_admin):
    #             queryset = self.get_queryset()
    #         else:
    #             queryset = []
    #     except:
    #         queryset = []
    #
    #         pass
    #     serializer = VideoSerializer(queryset)
    #     return Response(serializer.data)




class PPTXList(generics.ListCreateAPIView):
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly,
    #                       IsOwnerOrReadOnly]
    queryset = PPTXMaterial.objects.all().order_by('-id')
    serializer_class = PPTXSerializer

    def list(self, request):
        user = request.user

        school = None
        try:
            if (user.is_admin):
                queryset = PPTXMaterial.objects.all().order_by('-id')
                serializer = PPTXSerializer(queryset, many=True)
                return Response(serializer.data)
        except:
            queryset = []
            pass

        try:
            if (user.is_student):
                student = Student.objects.get(pk=user.id)
                school = SchoolSection.objects.get(pk=student.school_section.id)

            elif user.is_teacher:
                teacher = Teacher.objects.get(pk=user.id)
                school = SchoolSection.objects.get(pk=teacher.institute_name.id)
            queryset = PPTXMaterial.objects.filter(Q(school=school.id) | Q(public=True)).all().order_by('-id')

        except:
            queryset = []
            pass
        serializer = PPTXSerializer(queryset, many=True)
        return Response(serializer.data)


class PPTXDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                          AccessPermission, IsCreatedBy]
    queryset = PPTXMaterial.objects.all()
    serializer_class = PPTXSerializer



class DocList(generics.ListCreateAPIView):
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly,
    #                       IsOwnerOrReadOnly]
    queryset = DocMaterial.objects.all().order_by('-id')
    serializer_class = DocSerializer

    def list(self, request):
        user = request.user

        school = None
        try:
            if (user.is_admin):
                queryset = DocMaterial.objects.all().order_by('-id')
                serializer = DocSerializer(queryset, many=True)
                return Response(serializer.data)
        except:
            queryset = []
            pass

        try:
            if (user.is_student):
                student = Student.objects.get(pk=user.id)
                school = SchoolSection.objects.get(pk=student.school_section.id)

            elif user.is_teacher:
                teacher = Teacher.objects.get(pk=user.id)
                school = SchoolSection.objects.get(pk=teacher.institute_name.id)
            queryset = DocMaterial.objects.filter(Q(school=school.id) | Q(public=True)).all().order_by('-id')

        except:
            queryset = []
            pass
        serializer = DocSerializer(queryset, many=True)
        return Response(serializer.data)


class DocDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                          AccessPermission, IsCreatedBy]
    queryset = DocMaterial.objects.all()
    serializer_class = DocSerializer



class QuizList(generics.ListCreateAPIView):
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly,
    #                       IsOwnerOrReadOnly]
    queryset = Quiz.objects.all().order_by('-start_date')
    serializer_class = QuizSerializer


    def list(self, request):
        user = request.user

        school = None
        try:
            if (user.is_admin):
                queryset = Quiz.objects.all().order_by('-id')
                serializer = QuizSerializer(queryset, many=True)
                return Response(serializer.data)
        except:
            queryset = []
            pass

        try:
            if (user.is_student):
                student = Student.objects.get(pk=user.id)
                school = SchoolSection.objects.get(pk=student.school_section.id)

            elif user.is_teacher:
                teacher = Teacher.objects.get(pk=user.id)
                school = SchoolSection.objects.get(pk=teacher.institute_name.id)
            queryset = Quiz.objects.filter(Q(school=school.id) | Q(public=True)).all().order_by('-id')

        except:
            queryset = []
            pass
        serializer = QuizSerializer(queryset, many=True)
        return Response(serializer.data)



class QuizDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                        IsCreatedBy]
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
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                         IsCreatedBy]
    queryset = Discussion.objects.all()
    serializer_class = DiscussionSerializer




class CommentList(generics.ListCreateAPIView):
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly,
    #                       IsOwnerOrReadOnly]
    queryset = Comment.objects.all().order_by('-id')
    serializer_class = CommentSerializer


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                          IsCreatedBy]
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