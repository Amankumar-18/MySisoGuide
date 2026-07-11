


# from rest_framework import status
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import AllowAny
# from rest_framework.response import Response

# from rest_framework_simplejwt.tokens import RefreshToken

# from .serializers import LoginSerializer


# @api_view(["POST"])
# @permission_classes([AllowAny])
# def login_view(request):

#     serializer = LoginSerializer(data=request.data)

#     if serializer.is_valid():

#         user = serializer.validated_data["user"]

#         refresh = RefreshToken.for_user(user)

#         return Response({
#             "access": str(refresh.access_token),
#             "refresh": str(refresh),
#             "user": {
#                 "id": user.id,
#                 "username": user.username,
#                 "email": user.email,
#                 "role": user.role,
#             }
#         })

#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from django.shortcuts import get_object_or_404
from .models import User
from .serializers import RegisterSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated


from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken
from papervoult.models import ActivityLog
from .serializers import LoginSerializer



def log_activity(request, action, target):
    if request.user.is_authenticated:
        ActivityLog.objects.create(
            user=request.user,
            user_name=request.user.username,
            user_email=request.user.email,
            action=action,
            target=target,
        )



@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):

    serializer = LoginSerializer(data=request.data)

    if serializer.is_valid():

        user = serializer.validated_data["user"]

        refresh = RefreshToken.for_user(user)

        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "role": user.role,
            }
        })

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def register_view(request):

    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

        return Response(
            {"message": "User registered successfully"},
            status=status.HTTP_201_CREATED
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_list(request):

    if request.user.role != "SUPERADMIN":
        return Response(
            {"message": "Permission denied"},
            status=status.HTTP_403_FORBIDDEN
        )

    users = User.objects.all()

    serializer = UserSerializer(users, many=True)

    return Response(serializer.data)



@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def make_admin(request, pk):

    if request.user.role != "SUPERADMIN":
        return Response(
            {"message": "Permission denied"},
            status=status.HTTP_403_FORBIDDEN
        )

    user = get_object_or_404(User, pk=pk)

    user.role = "ADMIN"
    user.save()

    return Response({"message": "Admin access granted"})


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def remove_admin(request, pk):

    if request.user.role != "SUPERADMIN":
        return Response(
            {"message": "Permission denied"},
            status=status.HTTP_403_FORBIDDEN
        )

    user = get_object_or_404(User, pk=pk)

    user.role = "USER"
    user.save()

    return Response({"message": "Admin access revoked"})


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def deactivate_user(request, pk):

    if request.user.role != "SUPERADMIN":
        return Response(
            {"message": "Permission denied"},
            status=status.HTTP_403_FORBIDDEN
        )

    user = get_object_or_404(User, pk=pk)

    user.is_active = False
    user.save()

    return Response({"message": "User deactivated"})


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def activate_user(request, pk):

    if request.user.role != "SUPERADMIN":
        return Response(
            {"message": "Permission denied"},
            status=status.HTTP_403_FORBIDDEN
        )

    user = get_object_or_404(User, pk=pk)

    user.is_active = True
    user.save()

    return Response({"message": "User activated"})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def change_password(request):
    user = request.user
    old_password = request.data.get("old_password")
    new_password = request.data.get("new_password")

    if not user.check_password(old_password):
        return Response({"message": "Old password is incorrect"}, status=status.HTTP_400_BAD_REQUEST)

    user.set_password(new_password)
    user.save()

    return Response({"message": "Password changed successfully"})


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def user_delete(request, pk):
    if request.user.role != "SUPERADMIN":
        return Response(
            {"message": "Permission denied"},
            status=status.HTTP_403_FORBIDDEN
        )

    user = get_object_or_404(User, pk=pk)
    log_activity(
        request,
        "DELETED",
        f"User - {user.username}"
    )
    user.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

