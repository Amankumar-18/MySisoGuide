from django.conf import settings
from django.db import models
from django.utils.text import slugify
from cloudinary.models import CloudinaryField



class Course(models.Model):
    name = models.CharField(max_length=150, unique=True)
    slug = models.SlugField(max_length=180, unique=True, blank=True)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=80, default="BookOpen")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Subject(models.Model):
    course = models.ForeignKey(
        Course,
        related_name="subjects",
        on_delete=models.CASCADE
    )

    name = models.CharField(max_length=150)

    code = models.CharField(max_length=40)

    # Leave empty for Class 11 & 12
    semester = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("course", "code")
        ordering = ["course__name", "name"]

    def __str__(self):
        return f"{self.name} ({self.code})"


class Paper(models.Model):

    EXAM_TYPES = [
        ("MID", "Mid Semester"),
        ("END", "End Semester"),
        ("SUPP", "Supplementary"),
        ("OTHER", "Other"),
    ]

    subject = models.ForeignKey(
        Subject,
        related_name="papers",
        on_delete=models.CASCADE
    )

    title = models.CharField(max_length=180)

    year = models.PositiveIntegerField()

    exam_type = models.CharField(
        max_length=10,
        choices=EXAM_TYPES,
        default="END"
    )

    file = models.FileField(
        upload_to="papers/"
    )
    

    uploaded_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    downloads = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-year", "title"]

    def __str__(self):
        return f"{self.title} ({self.year})"


class ActivityLog(models.Model):

    ACTION_CHOICES = [
        ("CREATED", "Created"),
        ("UPDATED", "Updated"),
        ("DELETED", "Deleted"),
        ("LOGIN", "Login"),
        ("LOGOUT", "Logout"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    user_name = models.CharField(max_length=150)

    user_email = models.EmailField(blank=True)

    action = models.CharField(
        max_length=20,
        choices=ACTION_CHOICES
    )

    target = models.CharField(max_length=220)

    icon = models.CharField(
        max_length=80,
        default="Activity"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user_name} {self.action} {self.target}"