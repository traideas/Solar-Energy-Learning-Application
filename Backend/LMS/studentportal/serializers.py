from rest_framework import serializers
from studentportal.models import *
import json
from django.forms.models import model_to_dict
import os


#
#
# class CreatedByField(serializers.PrimaryKeyRelatedField):
#     def to_representation(self, value):
#         pk = super(CreatedByField, self).to_representation(value)
#         try:
#            item = User.objects.get(pk=pk)
#            serializer = UserSerializer(item)
#            return serializer.data
#         except Discussion.DoesNotExist:
#            return None
#
#     def get_choices(self, cutoff=None):
#         queryset = self.get_queryset()
#         if queryset is None:
#             return {}
#
#         return OrderedDict([(item.id, str(item)) for item in queryset])
#
#





class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

    def to_representation(self, instance):
        data = super(CommentSerializer, self).to_representation(instance)
        # print(data)
        # print( model_to_dict(instance.created_by))
        user = model_to_dict(instance.created_by)
        # user['photo'] = None
        created_by = {
            'name': user["first_name"]+" "+ user["last_name"],
            'photo': 'http://127.0.0.1:8000/media/'+ str(instance.created_by.photo)
        }
        # print(str(instance.created_by.photo))

        data['created_by'] = created_by

        return data


class DiscussionSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    class Meta:
        model = Discussion
        fields = ['id', 'title', 'description', 'file', 'created_by', 'created_date', 'school', 'status', 'comments']
        extra_kwargs = {'id': {'read_only': True},
                        'school': {'required': False, 'read_only': True},
                        'file': {'required': False},
                        }


    def to_representation(self, instance):
        data = super(DiscussionSerializer, self).to_representation(instance)
        # print(data)
        # print( model_to_dict(instance.created_by))
        user  = model_to_dict(instance.created_by)
        # user['photo'] = None
        created_by = {
            'name': user["first_name"] + " " + user["last_name"],
            'photo': 'http://127.0.0.1:8000/media/' + str(instance.created_by.photo)
        }

        data['created_by'] = created_by

        return data


    def validate(self, data):
        try:
            user = data.get('created_by')
            # record = User.objects.get(pk=user.id)
        except:
            # record = None
            pass
        if user.is_admin:
            raise serializers.ValidationError("Admin can not create discussion")
        return super().validate(data)


    def create(self, validated_data):
        creator = validated_data['created_by']
        school = None
        if(creator.is_student):
            student = Student.objects.get(pk=creator.id)
            school = SchoolSection.objects.get(pk=student.school_section.id)


        elif creator.is_teacher:
            teacher = Teacher.objects.get(pk=creator.id)
            school = SchoolSection.objects.get(pk=teacher.institute_name.id)

        validated_data['school'] = school
        discussion = Discussion.objects.create(**validated_data)
        # creator = validated_data['creator']
        print(creator.username)
        discussion.save()

        return discussion




class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=200)
    discussions = DiscussionSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = ['id','first_name', 'last_name', 'username', 'email', 'password', 'discussions', 'photo']
        extra_kwargs = {'id': {'read_only': True}, 'password': {'write_only': True, 'required': False},
                        'username': {'required': False},
                        'photo': {'required': False},
                        }

class AdminSerializer(serializers.ModelSerializer):
    # username = serializers.CharField(max_length=200)
    # discussions = DiscussionSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = ['id','first_name', 'last_name', 'username', 'email', 'password', 'photo']
        extra_kwargs = {'id': {'read_only': True}, 'password': {'write_only': True, 'required': False},
                        'username': {'required': True},
                        'photo': {'required': False},
                        }

    def validate(self, data):
        try:
            username = data.get('username')
            record = Score.objects.filter(username=username).first()
        except:
            record = None
            pass
        if record:
            raise serializers.ValidationError("Username has already been used, try with another one")

        return super().validate(data)

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        password = validated_data['password']
        user.set_password(password)
        user.is_admin = True
        user.save()
        print(user.is_admin)

        return user



    def update(self, instance, validated_data):
        user_data = validated_data
        user = instance
        try:
           user.first_name = user_data['first_name']
           user.last_name = user_data['last_name']
           user.email = user_data['email']

        except:
            pass

        try:
            if user_data['password']:
                user.set_password(user_data['password'])
            # print(user_data['password'])
        except:
            pass

        try:
            if(user_data['photo']!=None):
                user.photo = user_data['photo']
        except: pass
        #
        #
        #
        instance.save()
        return instance


class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolSection
        fields = '__all__'
        read_only_fields = ['student_count']

    def validate(self, data):
        try:
            user = data.get('creator')
            # record = User.objects.get(pk=user.id)
        except:
            # record = None
            pass
        if user.is_admin != True:
            raise serializers.ValidationError("This User is not an admin and has no permission to set up school")
        return super().validate(data)

    def create(self, validated_data):
        school = SchoolSection.objects.create(**validated_data)
        school.student_count = 0
        school.save()
        return school



class ScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Score
        fields = ['id', 'student', 'quiz', 'totalQuestion', 'totalMarks', 'right', 'wrong', 'score', 'date']
        extra_kwargs = {'id': {'read_only': True},
                        'totalQuestion': {'required': False},
                        'totalMarks': {'required': False},
                        'right': {'required': False},
                        'wrong': {'required': False},
                        'date': {'read_only': True, 'required': False},
                        }

    def validate(self, data):
        student = data.get('student')
        quiz = data.get('quiz')
        # sku = data.get('sku')

        record = Score.objects.filter(student=student, quiz=quiz).first()

        if record:
            raise serializers.ValidationError("Student already attend this quiz")

        return super().validate(data)




class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    # school_section = SchoolSerializer()
    studentScore = ScoreSerializer(many=True, read_only=True)

    class Meta:
        model = Student
        # fields = ['user', 'school_section', 'school_roll', 'birth_date']
        fields = ['user', 'school_section', 'school_roll', 'studentScore']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        school_section_data = validated_data.pop('school_section')
        print(school_section_data)
        print(school_section_data.id)


        user = User.objects.create(**user_data)
        user.is_student = True
        user.set_password(user_data['password'])
        user.save()


        try:
            school_section = SchoolSection.objects.get(pk=school_section_data.id)
            count = school_section.student_count
            school_section.student_count = count + 1
            school_section.save()
        except:
            # school_section = SchoolSection.objects.create(**school_section_data)
            pass

        student = Student.objects.create(user=user, school_section=school_section, **validated_data)
        return student


    def update(self, instance, validated_data):
        user_data = validated_data.pop('user')
        school_section_data = validated_data.pop('school_section')
        print('1')
        user = instance.user
        print('2')
        temp_school_section = instance.school_section
        user.first_name = user_data['first_name']
        user.last_name = user_data['last_name']
        user.email = user_data['email']

        # user = User.objects.update(**user_data)
        # user.set_password(user_data['password'])




        try:
            user.set_password(user_data['password'])
            print(user_data['password'])
        except:
            pass

        try:
            if(user_data['photo']!=None):
                user.photo = user_data['photo']
        except: pass



        user.save()
        try:
            temp_school_section.student_count = temp_school_section.student_count - 1
            temp_school_section.save()

            school_section = SchoolSection.objects.get(
                                                       school_name=school_section_data['school_name'])
            print(school_section)
            count = school_section.student_count
            school_section.student_count = count + 1
            school_section.save()
        except:
            school_section = SchoolSection.objects.create(**school_section_data)

            pass

        instance.school_section = school_section
        # instance.birth_date = validated_data.get('birth_date', instance.birth_date)
        instance.save()
        return instance





class TeacherSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    # courseteachers = serializers.HyperlinkedRelatedField(many=True, view_name='coursemanagement-detail', read_only=True)
    class Meta:
        model = Teacher
        fields = ['user', 'institute_name', 'is_verified']
        # extra_kwargs = {'is_verified': {'read_only': True}}

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create(**user_data)
        user.is_teacher = True

        user.set_password(user_data['password'])
        user.save()
        teacher = Teacher.objects.create(user=user,**validated_data)
        teacher.is_verified = False
        teacher.save()
        return teacher

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user')
        user = instance.user
        user.first_name = user_data['first_name']
        user.last_name = user_data['last_name']
        user.email = user_data['email']
        # user.photo = user_data['photo']
        # user.set_password(user_data['password'])


        try:
            user.set_password(user_data['password'])
            print(user_data['password'])
        except:
            pass

        try:
            if(user_data['photo']!=None):
                user.photo = user_data['photo']
        except: pass


        user.save()
        instance.institute_name = validated_data.get('institute_name', instance.institute_name)
        instance.is_verified = validated_data.get('is_verified', instance.is_verified)
        instance.save()

        return instance





class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoMaterial
        fields = ['id', 'title', 'description', 'created_by','school',
                  'upload_date', 'photo', 'material_type', 'file', 'status', 'public']
        extra_kwargs = {'id': {'read_only': True},
                        'public': {'read_only': True, 'required': False},
                        'upload_date': {'read_only': True, 'required': False},
                        'school': {'read_only': True, 'required': False},
                        'username': {'required': False}
                        }

    def to_representation(self, instance):
        data = super(VideoSerializer, self).to_representation(instance)
        user = model_to_dict(instance.created_by)
        # user['photo'] = None
        created_by = {
            'name': user["first_name"] + " " + user["last_name"],
            'photo': 'http://127.0.0.1:8000/media/' + str(instance.created_by.photo)
        }
        # print(str(instance.created_by.photo))
        data['created_by'] = created_by
        # data['created_by'] = "hello"
        return data



    def validate(self, data):
        try:
            user = data.get('created_by')
            # record = User.objects.get(pk=user.id)
        except:
            # record = None
            pass
        if user.is_student:
            raise serializers.ValidationError("This User has no permission to publish any study material")
        return super().validate(data)


    def create(self, validated_data):
        user = validated_data['created_by']
        material = VideoMaterial.objects.create(**validated_data)
        if user.is_admin:
            material.public = True

        else:
            teacher = Teacher.objects.get(pk=user.id)
            material.school = teacher.institute_name


        material.save()
        return material


    # def update(self, instance, validated_data):
    #     pass




class PPTXSerializer(serializers.ModelSerializer):
    class Meta:
        model = PPTXMaterial
        fields = ['id', 'title', 'description', 'created_by',
                  'upload_date', 'photo', 'material_type', 'file', 'status', 'public']
        extra_kwargs = {'id': {'read_only': True},
                        'public': {'read_only': True, 'required': False},
                        'upload_date': {'read_only': True, 'required': False},
                        'username': {'required': False}}

    def to_representation(self, instance):
        data = super(PPTXSerializer, self).to_representation(instance)
        user = model_to_dict(instance.created_by)
        # user['photo'] = None
        created_by = {
            'name': user["first_name"] + " " + user["last_name"],
            'photo': 'http://127.0.0.1:8000/media/' + str(instance.created_by.photo)
        }
        data['created_by'] = created_by

        return data



    def validate(self, data):
        try:
            user = data.get('created_by')
            # record = User.objects.get(pk=user.id)
        except:
            # record = None
            pass
        if user.is_student:
            raise serializers.ValidationError("This User has no permission to publish any study material")
        return super().validate(data)



    def create(self, validated_data):
        user = validated_data['created_by']
        material = PPTXMaterial.objects.create(**validated_data)
        if user.is_admin:
            material.public = True

        else:
            teacher = Teacher.objects.get(pk=user.id)
            material.school = teacher.institute_name

        material.save()
        return material


class DocSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocMaterial
        fields = ['id', 'title', 'description', 'created_by',
                  'upload_date', 'photo', 'material_type', 'file', 'status', 'public']
        extra_kwargs = {'id': {'read_only': True},
                        'public': {'read_only': True, 'required': False},
                        'upload_date': {'read_only': True, 'required': False},
                        'username': {'required': False}}

    def to_representation(self, instance):
        data = super(DocSerializer, self).to_representation(instance)
        user = model_to_dict(instance.created_by)
        # user['photo'] = None
        created_by = {
            'name': user["first_name"] + " " + user["last_name"],
            'photo': 'http://127.0.0.1:8000/media/' + str(instance.created_by.photo)
        }
        data['created_by'] = created_by

        return data


    def validate(self, data):
        try:
            user = data.get('created_by')
            # record = User.objects.get(pk=user.id)
        except:
            # record = None
            pass
        if user.is_student:
            raise serializers.ValidationError("This User has no permission to publish any study material")
        return super().validate(data)


    def create(self, validated_data):
        user = validated_data['created_by']
        material = DocMaterial.objects.create(**validated_data)
        if user.is_admin:
            material.public = True

        else:
            teacher = Teacher.objects.get(pk=user.id)
            material.school = teacher.institute_name

        material.save()
        return material




class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['quiz', 'question', 'options_1', 'options_2',
                  'options_3', 'options_4', 'answer', 'mark']
        extra_kwargs = {'id': {'read_only': True},
            'mark': {'required': False}}



class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    class Meta:
        model = Quiz
        fields = ['id','title', 'description', 'teacher', 'start_date', 'photo','questions','total_marks']

        extra_kwargs = { 'id': {'read_only': True},
                       'total_marks': {'required': False},
                         'photo': {'required': False}
                         }






