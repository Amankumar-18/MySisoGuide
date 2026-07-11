from django.urls import path
from . import views

urlpatterns = [

    # Course
    path("courses/", views.course_list, name="course-list"),
    path("courses/<int:pk>/", views.course_detail, name="course-detail"),
    path("courses/create/", views.course_create, name="course-create"),
    path("courses/<int:pk>/update/", views.course_update, name="course-update"),
    path("courses/<int:pk>/delete/", views.course_delete, name="course-delete"),

    # Subject
    path("subjects/", views.subject_list, name="subject-list"),
    path("subjects/<int:pk>/", views.subject_detail, name="subject-detail"),
    path("subjects/create/", views.subject_create, name="subject-create"),
    path("subjects/<int:pk>/update/", views.subject_update, name="subject-update"),
    path("subjects/<int:pk>/delete/", views.subject_delete, name="subject-delete"),

    # Paper
    path("papers/", views.paper_list, name="paper-list"),
    path("papers/<int:pk>/", views.paper_detail, name="paper-detail"),
    path("papers/create/", views.paper_create, name="paper-create"),
    path("papers/<int:pk>/update/", views.paper_update, name="paper-update"),
    path("papers/<int:pk>/delete/", views.paper_delete, name="paper-delete"),

    path("activities/",views.activity_list,name="activity-list"),
    path("stats/", views.public_stats, name="public-stats"),

]