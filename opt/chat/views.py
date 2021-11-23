from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.db import transaction

from .models import Room
from .serializer import RoomSerializer, RoomMemberSerializer, RoomMessageSerializer
import sys
sys.path.append('../')
from accounts.models import User


def index(request):
    return render(request, 'chat/index.html', {})

def room(request, room_name):
    return render(request, 'chat/room.html', {
        'room_name': room_name
    })


def obtain_user(user_name):
    if User.objects.filter(name=user_name).exists():
        user_query = User.objects.get(name=user_name)
        return user_query
    return Exception('user not found')

def obtain_room(room_name):
    if Room.objects.filter(name=room_name).exists():
        room_query = Room.objects.get(name=room_name)
        return room_query
    raise Exception('room not found')


def add_user(room_name, user_name):
    user_query = obtain_user(user_name)
    room_query = obtain_room(room_name)
    serializer = RoomMemberSerializer(data={
        'room': room_query.id,
        'user': user_query.id
    })
    if serializer.is_valid():
        room_member = serializer.save()
        res = {
            "room_id": room_member.room.id,
            "user_id": room_member.user.id
        }
        return res
    raise Exception("cannot add user")


@api_view(['POST'])
@csrf_exempt
def create_room(request):
    room_name = request.data['room_name']
    room_members = request.data['room_members']
    
    res = {}
    try:
        with transaction.atomic():
            serializer = RoomSerializer(data={
                'name': room_name, 
                'member_count': len(room_members)
            })
            if serializer.is_valid():
                room = serializer.save()
                res['room'] = {
                    "id": room.id,
                    "name": room.name,
                    "member_count": room.member_count,
                }

            users = []
            for name in room_members:
                room_member = add_user(room_name, name)
                users.append(room_member)
            res['users'] = users
            return JsonResponse(res, status=201)
    except Exception as e:
        return JsonResponse(e, status=400)

@api_view(['POST'])
@csrf_exempt
def post_msg(request):
    user_query = obtain_user(request.data['user_name'])
    room_query = obtain_room(request.data['room_name'])
    
    serializer = RoomMessageSerializer(data={
        'message': request.data['msg'],
        'room': room_query.id,
        'send_user': user_query.id
    })
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)

# 全roomの取得
@api_view(['GET'])
def obtain_all_rooms(request):
    if not Room.objects.all().exists():
        return JsonResponse({"message": 'no room'}, status=400)

    rooms = []
    all_rooms = Room.objects.all()
    for room in all_rooms:
        tmp_room = {
            "room_id": room.id,
            "room_name": room.name
        }
        rooms.append(tmp_room)
    res = {"rooms": rooms}
    return JsonResponse(res, status=201)