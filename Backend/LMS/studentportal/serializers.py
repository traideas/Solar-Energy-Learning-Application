from rest_framework import serializers
from studentportal.models import *



class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class DiscussionSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    class Meta:
        model = Discussion
        fields = ['id','title', 'description', 'created_by', 'created_date', 'status', 'comments']





class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=200)
    discussions = DiscussionSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = ['id','first_name', 'last_name', 'username', 'email', 'password', 'discussions']
        extra_kwargs = {'id': {'read_only': True}, 'password': {'write_only': True, 'required': False},
                        'username': {'required': False}}



class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolSection
        fields = '__all__'
        read_only_fields = ['student_count']



class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    school_section = SchoolSerializer()

    class Meta:
        model = Student
        fields = ['user', 'school_section', 'school_roll', 'birth_date']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        school_section_data = validated_data.pop('school_section')
        try:
            school_section = SchoolSection.objects.get(section=school_section_data['section'], school_name=school_section_data['school_name'])
            count = school_section.student_count
            school_section.student_count = count + 1
            school_section.save()
        except:
            school_section = SchoolSection.objects.create(**school_section_data)
            pass

        user = User.objects.create(**user_data)
        user.is_student = True
        user.set_password(user_data['password'])
        user.save()
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



        try:
            user.set_password(user_data['password'])
            print(user_data['password'])
        except:
            pass



        user.save()
        try:
            temp_school_section.student_count = temp_school_section.student_count - 1
            temp_school_section.save()

            school_section = SchoolSection.objects.get(section=school_section_data['section'],
                                                       school_name=school_section_data['school_name'])
            print(school_section)
            count = school_section.student_count
            school_section.student_count = count + 1
            school_section.save()
        except:
            school_section = SchoolSection.objects.create(**school_section_data)

            pass

        instance.school_section = school_section
        instance.birth_date = validated_data.get('birth_date', instance.birth_date)
        instance.save()
        return instance





class TeacherSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    # courseteachers = serializers.HyperlinkedRelatedField(many=True, view_name='coursemanagement-detail', read_only=True)
    class Meta:
        model = Teacher
        fields = ['user', 'institute_name']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create(**user_data)
        user.is_teacher = True
        user.set_password(user_data['password'])
        user.save()
        teacher = Teacher.objects.create(user=user,**validated_data)
        return teacher

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user')
        user = instance.user
        user.first_name = user_data['first_name']
        user.last_name = user_data['last_name']
        user.email = user_data['email']


        try:
            user.set_password(user_data['password'])
            print(user_data['password'])
        except:
            pass


        user.save()
        instance.institute_name = validated_data.get('institute_name', instance.institute_name)
        instance.save()
        return instance





class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoMaterial
        fields = ['id', 'title', 'description', 'created_by', 'created_by',
                  'upload_date', 'photo', 'material_type', 'file', 'status']
        extra_kwargs = {'id': {'read_only': True},
                        'upload_date': {'read_only': True, 'required': False},
                        'username': {'required': False}}




class PPTXSerializer(serializers.ModelSerializer):
    class Meta:
        model = PPTXMaterial
        fields = ['id', 'title', 'description', 'created_by', 'created_by',
                  'upload_date', 'photo', 'material_type', 'file', 'status']
        extra_kwargs = {'id': {'read_only': True},
                        'upload_date': {'read_only': True, 'required': False},
                        'username': {'required': False}}




class DocSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocMaterial
        fields = ['id', 'title', 'description', 'created_by', 'created_by',
                  'upload_date', 'photo', 'material_type', 'file', 'status']
        extra_kwargs = {'id': {'read_only': True},
                        'upload_date': {'read_only': True, 'required': False},
                        'username': {'required': False}}






class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ['title', 'description', 'teacher', 'start_date', 'photo','total_marks']


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['quiz', 'question', 'options_1', 'options_2',
                  'options_3', 'options_4', 'answer', 'mark']





