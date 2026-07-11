# from django.shortcuts import render

# # Create your views here.
# from rest_framework.permissions import IsAuthenticated

# from .models import Course, Subject, Paper
# from .serializers import (
#     CourseSerializer,
#     SubjectSerializer,
#     PaperSerializer,
# )
# from django.http import JsonResponse
# from rest_framework.response import Response

# from rest_framework import status
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated, AllowAny

# # Course APIs


# @api_view(["GET"])
# @permission_classes([AllowAny])
# def course_list(request):
#     courses = Course.objects.all()
#     serializer = CourseSerializer(courses, many=True)
#     return Response(serializer.data, status=status.HTTP_200_OK)

# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def course_create(request):
#     serializer = CourseSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(["PUT"])
# @permission_classes([IsAuthenticated])
# def course_update(request, pk):
#     try:
#         course = Course.objects.get(pk=pk)
#     except Course.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     serializer = CourseSerializer(course, data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(["DELETE"])
# @permission_classes([IsAuthenticated])
# def course_delete(request, pk):
#     try:
#         course = Course.objects.get(pk=pk)
#     except Course.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     course.delete()
#     return Response(status=status.HTTP_204_NO_CONTENT)

# @api_view(["GET"])
# @permission_classes([AllowAny])
# def subject_list(request):
#     subjects = Subject.objects.all()
#     serializer = SubjectSerializer(subjects, many=True)
#     return Response(serializer.data, status=status.HTTP_200_OK)

# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def subject_create(request):
#     serializer = SubjectSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(["PUT"])
# @permission_classes([IsAuthenticated])  
# def subject_update(request, pk):
#     try:
#         subject = Subject.objects.get(pk=pk)
#     except Subject.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     serializer = SubjectSerializer(subject, data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(["DELETE"])
# @permission_classes([IsAuthenticated])  
# def subject_delete(request,pk):
#     try:
#         subject=Subject.objects.get(pk=pk)
#     except Subject.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
    
#     subject.delete()
#     return Response(status=status.HTTP_204_NO_CONTENT)


# @api_view(["GET"])
# @permission_classes([AllowAny]) 
# def paper_list(request):
#     papers = Paper.objects.all()
#     serializer = PaperSerializer(papers, many=True)
#     return Response(serializer.data, status=status.HTTP_200_OK)


# @api_view(["POST"])
# @permission_classes([IsAuthenticated])  
# def paper_create(request):
#     serializer = PaperSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(["PUT"])
# @permission_classes([IsAuthenticated])
# def paper_update(request, pk):
#     try:
#         paper = Paper.objects.get(pk=pk)
#     except Paper.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     serializer = PaperSerializer(paper, data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(["DELETE"])
# @permission_classes([IsAuthenticated])
# def paper_delete(request, pk):
#     try:
#         paper = Paper.objects.get(pk=pk)
#     except Paper.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     paper.delete()
#     return Response(status=status.HTTP_204_NO_CONTENT)




from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import ActivityLog
from .serializers import ActivitySerializer

from .models import Course, Subject, Paper,ActivityLog
from .serializers import CourseSerializer, SubjectSerializer, PaperSerializer,PublicStatsSerializer


def log_activity(request, action, target):
    if request.user.is_authenticated:
        ActivityLog.objects.create(
            user=request.user,
            user_name=request.user.username,
            user_email=request.user.email,
            action=action,
            target=target,
        )

def is_admin(user):
    return user.role in ["SUPERADMIN", "ADMIN"]


@api_view(["GET"])
@permission_classes([AllowAny])
def course_list(request):
    courses = Course.objects.all()
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([AllowAny])
def course_detail(request, pk):
    course = get_object_or_404(Course, pk=pk)
    serializer = CourseSerializer(course)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def course_create(request):

    if not is_admin(request.user):
        return Response(
        {"error": "Permission denied"},
        status=status.HTTP_403_FORBIDDEN)
    

    serializer = CourseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        log_activity(
    request,
    "CREATED",
    f"Course - {serializer.instance.name}"
)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT", "PATCH"])
@permission_classes([IsAuthenticated])
def course_update(request, pk):

    if not is_admin(request.user):
        return Response(
        {"error": "Permission denied"},
        status=status.HTTP_403_FORBIDDEN)
    
    course = get_object_or_404(Course, pk=pk)
    serializer = CourseSerializer(course, data=request.data, partial=request.method == "PATCH")

    if serializer.is_valid():
        serializer.save()
        log_activity(
            request,
            "UPDATED",
            f"Course - {serializer.instance.name}"
        )
        return Response(serializer.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def course_delete(request, pk):
    if not is_admin(request.user):
        return Response(
            {"error": "Permission denied"},
            status=status.HTTP_403_FORBIDDEN
        )

    course = get_object_or_404(Course, pk=pk)
    course.delete()
    log_activity(
        request,
        "DELETED",
        f"Course - {course.name}"
    )
    return Response(status=status.HTTP_204_NO_CONTENT)



@api_view(["GET"])
@permission_classes([AllowAny])
def subject_list(request):
    course_id = request.query_params.get("course")

    subjects = Subject.objects.all()

    if course_id:
        subjects = subjects.filter(course_id=course_id)

    serializer = SubjectSerializer(subjects, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([AllowAny])
def subject_detail(request, pk):
    subject = get_object_or_404(Subject, pk=pk)
    serializer = SubjectSerializer(subject)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def subject_create(request):
    if not is_admin(request.user):
        return Response(
            {"error": "Permission denied"},
            status=status.HTTP_403_FORBIDDEN
        )

    serializer = SubjectSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        log_activity(
            request,
            "CREATED",
            f"Subject - {serializer.instance.name}"
        )
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT", "PATCH"])
@permission_classes([IsAuthenticated])
def subject_update(request, pk):
    if not is_admin(request.user):
        return Response(
            {"error": "Permission denied"},
            status=status.HTTP_403_FORBIDDEN
        )

    subject = get_object_or_404(Subject, pk=pk)

    serializer = SubjectSerializer(
        subject,
        data=request.data,
        partial=request.method == "PATCH"
    )

    if serializer.is_valid():
        serializer.save()
        log_activity(
            request,
            "UPDATED",
            f"Subject - {serializer.instance.name}"
        )
        return Response(serializer.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def subject_delete(request, pk):
    if not is_admin(request.user):
        return Response(
            {"error": "Permission denied"},
            status=status.HTTP_403_FORBIDDEN
        )

    subject = get_object_or_404(Subject, pk=pk)
    subject.delete()
    log_activity(
        request,
        "DELETED",
        f"Subject - {subject.name}"
    )
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET"])
@permission_classes([AllowAny])
def paper_list(request):

    subject_id = request.query_params.get("subject")
    year = request.query_params.get("year")

    papers = Paper.objects.all()

    if subject_id:
        papers = papers.filter(subject_id=subject_id)

    if year:
        papers = papers.filter(year=year)

    serializer = PaperSerializer(papers, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def paper_detail(request, pk):
    paper = get_object_or_404(Paper, pk=pk)
    serializer = PaperSerializer(paper)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def paper_create(request):
    if not is_admin(request.user):
        return Response(
            {"error": "Permission denied"},
            status=status.HTTP_403_FORBIDDEN
        )

    serializer = PaperSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(uploaded_by=request.user)
        log_activity(
            request,
            "CREATED",
            f"Paper - {serializer.instance.title}"
        )
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT", "PATCH"])
@permission_classes([IsAuthenticated])
def paper_update(request, pk):
    if not is_admin(request.user):
        return Response(
            {"error": "Permission denied"},
            status=status.HTTP_403_FORBIDDEN
        )

    paper = get_object_or_404(Paper, pk=pk)

    serializer = PaperSerializer(
        paper,
        data=request.data,
        partial=request.method == "PATCH"
    )

    if serializer.is_valid():
        serializer.save()
        log_activity(
            request,
            "UPDATED",
            f"Paper - {serializer.instance.title}"
        )
        return Response(serializer.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def paper_delete(request, pk):
    if not is_admin(request.user):
        return Response(
            {"error": "Permission denied"},
            status=status.HTTP_403_FORBIDDEN
        )

    paper = get_object_or_404(Paper, pk=pk)
    log_activity(
        request,
        "DELETED",
        f"Paper - {paper.title}"
    )
    paper.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)








@api_view(["GET"])
@permission_classes([IsAuthenticated])
def activity_list(request):
    logs = ActivityLog.objects.all()

    serializer = ActivitySerializer(logs, many=True)

    return Response(serializer.data)


@api_view(["GET"])
def public_stats(request):
    data = {
        "courses": Course.objects.count(),
        "subjects": Subject.objects.count(),
        "papers": Paper.objects.count(),
    }

    serializer = PublicStatsSerializer(data)
    return Response(serializer.data)