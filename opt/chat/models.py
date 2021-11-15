from django.db import models

import sys
sys.path.append('../')
from accounts.models import User


class Room(models.Model):
    name = models.CharField(max_length=100)
    member_count = models.IntegerField(default=0)


class RoomMember(models.Model):
    room_id = models.ForeignKey(Room, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)


class RoomMessage(models.Model):
    message = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    room_id = models.ForeignKey(Room, on_delete=models.CASCADE)
    send_by = models.ForeignKey(User, on_delete=models.CASCADE)