from rest_framework import serializers
from .models import Course, Subject, Paper
from .models import ActivityLog


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = "__all__"


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = "__all__"


class PaperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paper
        fields = "__all__"


class PublicStatsSerializer(serializers.Serializer):
    courses = serializers.IntegerField()
    subjects = serializers.IntegerField()
    papers = serializers.IntegerField()






class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityLog
        fields = "__all__"