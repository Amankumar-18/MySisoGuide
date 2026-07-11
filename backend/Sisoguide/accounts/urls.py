# from django.urls import path
# from .views import login_view

# urlpatterns = [
#     path("login/", login_view),
# ]


from django.urls import path
from .views import (
    login_view,
    register_view,
    user_list,
    make_admin,
    remove_admin,
    activate_user,
    deactivate_user,me,change_password,user_delete,
)

urlpatterns = [
    path("login/", login_view),
    path("register/", register_view),

    path("users/", user_list),
    path("me/", me),
    path("users/<int:pk>/make-admin/", make_admin),
    path("users/<int:pk>/remove-admin/", remove_admin),

    path("users/<int:pk>/activate/", activate_user),
    path("users/<int:pk>/deactivate/", deactivate_user),
    path("change-password/", change_password),
    path("delete-user/<int:pk>/",user_delete),
]