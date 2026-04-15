from django.urls import path
from . import views

urlpatterns = [
    path("login/", views.login_view, name="login"),
    path("prompts/", views.prompt_list_create, name="prompt-list"),
    path("prompts/<uuid:pk>/", views.prompt_detail, name="prompt-detail"),
]
