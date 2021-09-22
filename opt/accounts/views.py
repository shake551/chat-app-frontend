from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail

import uuid
import os
import base64
import hashlib

from .models import User
from .serializer import UserSerializer


def hash_password(my_password, salt):
    password = bytes(my_password, 'utf-8')
    safe_pass = hashlib.sha256(salt + password).hexdigest()
    return safe_pass


@api_view(['POST'])
@csrf_exempt
def pre_signup(request):
    salt = base64.b64encode(os.urandom(32))
    
    insert_data = {
        'name': request.data['name'], 
        'email': request.data['email'],
        # salt と password を結合してハッシュ化
        'password': hash_password(request.data['password'], salt),
        'urltoken': uuid.uuid4(),
        'salt': str(salt)
    }
    
    serializer = UserSerializer(data=insert_data)

    if serializer.is_valid():
        new_data = serializer.save()
        verify_url = 'http://0.0.0.0:8000/api/verifyaccount?token=' + str(new_data.urltoken)
        send_mail(
            '本登録のお願い',
            '以下のリンクにアクセスして本登録を完了してください\n' + verify_url,
            'admin@example.com',
            [new_data.email],
            fail_silently=False,
        )
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)