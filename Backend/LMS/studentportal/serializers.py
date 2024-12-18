from rest_framework import serializers
from studentportal.models import *
import json
from django.forms.models import model_to_dict
import os
from dotenv import load_dotenv


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

load_dotenv()

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

    def to_representation(self, instance):
        url = '' 
        
        data = super(CommentSerializer, self).to_representation(instance)
        # print(data)
        # print( model_to_dict(instance.created_by))
        user = model_to_dict(instance.created_by)
        # user['photo'] = None
        created_by = {
            'name': user["first_name"]+" "+ user["last_name"],
            'photo': os.getenv('MEDIA_SERVER')+'/media/'+ str(instance.created_by.photo)
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
            'photo': os.getenv('MEDIA_SERVER')+'/media/' + str(instance.created_by.photo)
        }

        data['created_by'] = created_by
        data['file'] = os.getenv('MEDIA_SERVER')+'/media/' + str(instance.file)

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
            user = data.get('created_by')
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
        print(student.school_section)
        print(quiz.school)
        if  quiz.school!=None and quiz.school.id==student.school_section.id:
            raise serializers.ValidationError("Student does not belong to the specific school")
        if record:
            raise serializers.ValidationError("Student already attend this quiz")


        return super().validate(data)




class StudentSerializer(serializers.ModelSerializer):
    created_by = UserSerializer()

    # school_section = SchoolSerializer()
    studentScore = ScoreSerializer(many=True, read_only=True)

    class Meta:
        model = Student
        # fields = ['user', 'school_section', 'school_roll', 'birth_date']
        fields = ['created_by', 'school_section', 'school_roll', 'studentScore']
        extra_kwargs = {'id': {'read_only': True},
                        # 'public': {'read_only': True, 'required': False},
                        # 'upload_date': {'read_only': True, 'required': False},
                        # 'school_section': {'required': False},
                        'school_roll': {'required': False}
                        }

    def create(self, validated_data):
        user_data = validated_data.pop('created_by')
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

        student = Student.objects.create(created_by=user, school_section=school_section, **validated_data)
        return student


    def update(self, instance, validated_data):
        user_data = validated_data.pop('created_by')
        school_section_data = validated_data.pop('school_section')

        user = instance.created_by

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
                                                       school_name=school_section_data.school_name)

            count = school_section.student_count
            school_section.student_count = count + 1
            school_section.save()
            instance.school_section = school_section
            instance.save()
        except:
            # school_section = SchoolSection.objects.create(**school_section_data)

            pass

        #
        # instance.birth_date = validated_data.get('birth_date', instance.birth_date)
        instance.save()
        return instance


    def to_representation(self, instance):
        data = super(StudentSerializer, self).to_representation(instance)
        school = model_to_dict(instance.school_section)

        school_name = school['school_name']
        data['school_section'] = {'school': school_name, 'school_id': school['id']}
        # data['file'] = os.getenv('MEDIA_SERVER')+'/media/' + str(instance.file)

        return data




class TeacherSerializer(serializers.ModelSerializer):
    created_by = UserSerializer()
    # courseteachers = serializers.HyperlinkedRelatedField(many=True, view_name='coursemanagement-detail', read_only=True)
    class Meta:
        model = Teacher
        fields = ['created_by', 'institute_name', 'is_verified']
        # extra_kwargs = {'institute_name': {'required': False}}

    def create(self, validated_data):
        user_data = validated_data.pop('created_by')
        user = User.objects.create(**user_data)
        user.is_teacher = True

        user.set_password(user_data['password'])
        user.save()
        teacher = Teacher.objects.create(created_by=user, **validated_data)
        teacher.is_verified = False
        teacher.save()
        return teacher

    def update(self, instance, validated_data):
        user_data = validated_data.pop('created_by')
        user = instance.created_by
        user.first_name = user_data['first_name']
        user.last_name = user_data['last_name']
        user.email = user_data['email']
        # user.photo = user_data['photo']
        # user.set_password(user_data['password'])


        try:
            user.set_password(user_data['password'])

        except:
            pass

        try:
            if(user_data['photo']!=None):
                user.photo = user_data['photo']
        except: pass

        # try:
        #     if(validated_data.get('institute_name', instance.institute_name)!=None):
        #         instance.institute_name = validated_data.get('institute_name', instance.institute_name)
        #     else:
        #         validated_data['institute_name'] = instance.institute_name
        #
        # except: pass
        #
        # validated_data['institute_name'] = instance.institute_name
        user.save()

        instance.is_verified = validated_data.get('is_verified', instance.is_verified)
        instance.save()

        return instance

    def to_representation(self, instance):
        data = super(TeacherSerializer, self).to_representation(instance)
        school = model_to_dict(instance.institute_name)
        # user['photo'] = None
        institute_name = school
        data['institute_name'] = school
        # data['file'] = os.getenv('MEDIA_SERVER')+'/media/' + str(instance.file)

        return data





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
            'photo': os.getenv('MEDIA_SERVER')+'/media/' + str(instance.created_by.photo)
        }

        # print(str(instance.created_by.photo))
        data['created_by'] = created_by
        data['file'] = os.getenv('MEDIA_SERVER')+'/media/' + str(instance.file)
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
            'photo': os.getenv('MEDIA_SERVER')+'/media/' + str(instance.created_by.photo)
        }
        data['created_by'] = created_by
        data['file'] = os.getenv('MEDIA_SERVER')+'/media/' + str(instance.file)

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
            'photo': os.getenv('MEDIA_SERVER')+'/media/' + str(instance.created_by.photo)
        }
        data['created_by'] = created_by
        data['file'] = os.getenv('MEDIA_SERVER')+'/media/' + str(instance.file)

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
        fields = ['id', 'title', 'description', 'school', 'created_by', 'start_date', 'photo', 'questions', 'total_marks', 'public']

        extra_kwargs = {
                        'id': {'read_only': True},
                        'public': {'read_only': True},
                        'school': {'read_only': True},
                        'total_marks': {'required': False},
                        'photo': {'required': False}
                        }


    def validate(self, data):
        try:
            user = data.get('created_by')
            # record = User.objects.get(pk=user.id)
        except:
            # record = None
            pass
        if user.is_student:
            raise serializers.ValidationError("This User has no permission to publish any quiz")
        return super().validate(data)



    def create(self, validated_data):
        user = validated_data['created_by']
        material = Quiz.objects.create(**validated_data)
        if user.is_admin:
            material.public = True

        else:
            teacher = Teacher.objects.get(pk=user.id)
            material.school = teacher.institute_name

        material.save()
        return material





class AssignmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Assignment
        fields = ['id',
                  'created_by',
                  'title',
                  'school',
                  'description',
                  'submission_date',
                  'mark',
                  'photo',
                  'upload_date',
                  'file',
                  'status',
                  'public'
                  ]
        extra_kwargs = {
            'id': {'read_only': True},
            'title': {'required': True},
            'school': {'read_only': True},
            'created_by': {'required': True},
            'description': {'required': False},
            'submission_date': {'required': True},
            'upload_date': {'read_only': True, 'required': False},
            'mark': {'required': False},
            'photo': {'required': False},
            'file': {'required': False},
            'public': {'read_only': True, 'required': False},
            'status': {'read_only': True, 'required': False},
        }



    # def to_representation(self, instance):
    #     data = super(AssignmentSerializer, self).to_representation(instance)
    #     user = model_to_dict(instance.created_by)
    #     # user['photo'] = None
    #     created_by = {
    #         'name': user["first_name"] + " " + user["last_name"],
    #         'photo': os.getenv('MEDIA_SERVER')+'/media/' + str(instance.created_by.photo)
    #     }
    #     data['created_by'] = created_by
    #     data['file'] = os.getenv('MEDIA_SERVER')+'/media/' + str(instance.file)
    #
    #
    #     return data


    def validate(self, data):
        try:
            user = data.get('created_by')
            # record = User.objects.get(pk=user.id)
        except:
            # record = None
            pass
        if user.is_student:
            raise serializers.ValidationError("This User has no permission to create any assignment")
        return super().validate(data)


    def create(self, validated_data):
        user = validated_data['created_by']
        material = Assignment.objects.create(**validated_data)
        if user.is_admin:
            material.public = True

        else:
            teacher = Teacher.objects.get(pk=user.id)
            material.school = teacher.institute_name

        material.save()
        return material




class AssignmentSubmissionSerializer(serializers.ModelSerializer):

    class Meta:
        model = AssignmentSubmission
        fields = ['id', 'assignment','created_by', 'file', 'submission_date', 'late_submission']
        extra_kwargs = {
            'id': {'read_only': True},
            'created_by': {'required': True},
            'assignment': {'required': True},
            'file': {'required': True},
            'submission_date': {'read_only': True},
            'late_submission': {'read_only': True}
        }



    def validate(self, data):
        student = data.get('student')
        assignment = data.get('assignment')
        # sku = data.get('sku')

        record = AssignmentSubmission.objects.filter(student=student, assignment=assignment).first()
        print(student.school_section)
        print(assignment.school)
        if assignment.school!=None and assignment.school.id == student.school_section.id:
            raise serializers.ValidationError("Student does not belong to the specific school")
        if record:
            raise serializers.ValidationError("Assignment been submitted")


        return super().validate(data)



    def validate(self, data):
        try:
            student = data.get('created_by')
            # record = User.objects.get(pk=user.id)
        except:
            # record = None
            pass
        if student.created_by.is_student == False:
            raise serializers.ValidationError("This User has no permission to submit an assignment")
        return super().validate(data)


    def create(self, validated_data):
        material = AssignmentSubmission.objects.create(**validated_data)
        submitted_date = material.submission_date
        submission_date = material.assignment.submission_date
        if submission_date < submitted_date:
            material.late_submission = True
        material.save()
        return material




class AssignmentScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignmentScore
        fields = ['id', 'student', 'assignment', 'totalMarks', 'score', 'date']
        extra_kwargs = {'id': {'read_only': True},
                        'student': {'required': True},
                        'assignment': {'required': True},
                        'totalMarks': {'required': False},
                        'score': {'required': True},
                        'date': {'read_only': True},
                        }














