from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('new/', views.create_room),
    path('post/', views.post_msg),
    path('room/<str:room_name>/', views.room),
]