from rest_framework import permissions
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



class IsUser(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        return obj == request.user



#
# class IsSuperAdmin(permissions.BasePermission):
#     def has_object_permission(self, request, view, obj):
#         return (request.user.is_superuser == True)




class AccessPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return (request.user.is_admin or request.user.is_teacher)


class AdminPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return (request.user.is_admin)



class UniversalPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return




class QuizPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        print(obj)
        print(obj)
        print(obj)
        print(obj)
        quiz =  Quiz.objects.get(pk=obj.quiz.id)
        print(obj.student.school_section)
        print(obj.quiz.school)
        if obj.quiz.school==None:
            return (request.user.is_student)
        else:
            if(obj.student.school_section.id == obj.quiz.school.id):
                return (request.user.is_student)

class IsCreatedBy(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            # print(type(obj.creator))
            # print(type(request.user.username))
            # print(obj.creator == request.user)
            return (request.user.is_teacher or request.user.is_admin or request.user.is_student)
#
        # Write permissions are only allowed to the owner of the snippet.
        return (obj.created_by == request.user or request.user.is_admin)



class IsUser(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        # if request.method in permissions.SAFE_METHODS:
            # print(type(obj.creator))
            # print(type(request.user.username))
            # print(obj.creator == request.user)
        print(request.user)
        if request.user.is_admin:
            return (request.user.is_admin == True)

        else:
            return (obj.created_by == request.user)
#
# #
#         # Write permissions are only allowed to the owner of the snippet.
#         return (obj.created_by == request.user)
#         return