from rest_framework import permissions
from .models import UserInfoModel, ChatMessage, Clients, Profile
from rest_framework.decorators import APIView,api_view
from django.db.models import Q
from .serializers import SignUpSerializer, UserInfoSerializer, ChatMessageSerializer, ClientSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework_simplejwt import views as jwt_views,tokens
from rest_framework import status
from django.contrib.auth.models import User
# TODO: use authenticate while user loggs in
from django.contrib.auth import authenticate, logout
from django.http import HttpResponse, HttpResponseNotFound, Http404,  HttpResponseRedirect, FileResponse
from django.shortcuts import render, reverse
from django.utils.encoding import smart_str
from django.utils import timezone
from django.conf import settings
from django.core.mail import send_mail, EmailMessage
from django.utils.crypto import get_random_string
from datetime import datetime, timedelta
import _sha512
from pytz import utc
from pytz import timezone as tz

ist = tz(settings.TIME_ZONE)

def generate_activation_key(username):
    chars = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)'
    secret_key = get_random_string(20, chars)
    return _sha512.sha512((secret_key + username).encode('utf-8')).hexdigest()

activation_mail = '''
Dear {first_name},
    Welcome to BloodConnect. Keep donating blood.
http://{url}/api/key_verify/{key}/

Use the above link to verify yourself, link will expire within 10 minutes so click before that

Happy to have you onboard !!

Greetings from BloodConnect,
Keep Donating Blood :)
'''


def redirectView(request):
    return HttpResponseRedirect(reverse('homeUrl'))


def index(request):
    return render(request, 'index.html')

@api_view(['POST'])
def getToken(request):    
    # data = dict(request.body
    user = authenticate(**request.data)
    if user:
        refresh = tokens.RefreshToken.for_user(user)
        return Response({'refresh':str(refresh),'access':str(refresh.access_token)})            
    else:
        user = User.objects.filter(username=request.data['username'])
        if user and not user[0].is_active:
            return Response({'error':'Account Not Activated, Use Verification link to verify your account'},status=status.HTTP_406_NOT_ACCEPTABLE)
        return Response({'error':'No Active Found with Given Credentials'},status=status.HTTP_401_UNAUTHORIZED)

class SignUpView(APIView):
    def post(self, request):
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():
            user = User.objects.create_user(**request.data, is_active=False)
            try:
                activate_key = generate_activation_key(str(user.username))
                expiration_time = datetime.now()+timedelta(minutes=10)
                url = 'blood-connect-major.herokuapp.com'
                # url = 'localhost:8000'  # TODO: Comment this in production
                message = activation_mail.format(
                    url=url, key=activate_key, first_name=str(user.first_name))
                send_mail('BloodConnect: Confirm your Registration - Verification Code',
                        message, 'faqritesh@gmail.com', [user.email], False)
                Profile.objects.create(
                    user=user, activation_key=activate_key, key_expires=expiration_time)
                return Response({'success': 'User Created'}, status=status.HTTP_201_CREATED)
            except:
                return Response({'error':'Error Occured while creating user in Profile Model'},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status.HTTP_409_CONFLICT)


class ActivationView(APIView):
    def get(self, request, key):
        '''
        * Check from User table if user is already activated
        * if user is not activated then check whther it is a valid key and the user clicked in proper time
        * if Profile.objects.filter(activation_key = key) is not returning any data means the key is not valid or changed
        * after validating key redirect it to home page /homeApp
        '''
        data = Profile.objects.filter(activation_key=key)
        if not list(data):
            return Response('Key is either Changed Manually or Expired', status=status.HTTP_400_BAD_REQUEST)
        else:
            for pf_data in data:
                if pf_data.user.is_active:
                    return Response('User Already Activated')
                time = pf_data.key_expires
                if timezone.now() < time:
                    pf_data.user.is_active = True
                    pf_data.user.save()
                    return Response('User Successfully verified now go to https://blood-connect-major.herokuapp.com/login')
                return Response("Token Time Expired")

    def put(self, request, username):
        user_data = User.objects.get(username=username)
        if not user_data.is_active:
            pf_data = Profile.objects.get(user=user_data)
            key = generate_activation_key(username)
            expiration_time = datetime.now()+timedelta(minutes=10)
            url = 'blood-connect-major.herokuapp.com'
            # url = 'localhost:8000'
            message = activation_mail.format(
                url=url, key=key, first_name=str(user_data.first_name))
            pf_data.activation_key = key
            pf_data.key_expires = expiration_time
            pf_data.save()
            send_mail('BloodConnect: Confirm your Registration - Resent Verification Code',
                      message, 'faqritesh@gmail.com', [str(user_data.email)], False)
            return Response({'success': 'New Verification Code sent to {email}'.format(email=str(user_data.email))}, status=status.HTTP_201_CREATED)        
        return Response({'success': 'User Account Already Activated'})


class RegisterView(APIView):
    def put(self, request):
        serializer = UserInfoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        return Response(serializer.errors, status.HTTP_404_NOT_FOUND)
    def get(self,request,username):        
        user_data = User.objects.filter(username = username)
        if not list(user_data):
            return Response({'success':'valid username'},status=status.HTTP_202_ACCEPTED)
        return Response({'error':'Username with that name already exists'},status=status.HTTP_409_CONFLICT)

class LoginView(APIView):
    # authentication_classes = [SessionAuthentication,BasicAuthentication]
    permission_classes = (IsAuthenticated,)

    def get(self, request, username):
        print(request.COOKIES)
        userInfo = UserInfoModel.objects.filter(username=username)
        serializer = UserInfoSerializer(userInfo, many=True)
        return Response(serializer.data)

    def delete(self, request):
        logout(request)
        return Response({'success': 'User Logged Out'})

class FileView(APIView):
    def post(self, request, id):  # For uploading Files according to UserId
        if request.FILES:
            data = UserInfoModel.objects.get(pk=id)
            data.profile_image = request.FILES.get('file')
            data.save()
            return Response({'success': 'Profile Pic Succesfully Uploaded'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'No File Attached'}, status=status.HTTP_204_NO_CONTENT)

    def get(self, request, id):   # For downloading image according to UserId
        data = UserInfoModel.objects.get(pk=id)
        image_url = str(data.profile_image)
        image_path = settings.MEDIA_ROOT + '\\' + image_url.replace('/', '\\')
        print(image_path)
        try:
            with open(image_path, 'rb') as image_upload:
                image_data = image_upload.read()
            response = HttpResponse(image_data, content_type='image/png')
            response['Content-Disposition'] = 'attachment; filename=%s' % smart_str(
                image_url.split('/')[-1])
            response['X-Sendfile'] = smart_str(image_path)
        except IOError:
            response = Response({'error': 'File Does Not Exists'},
                                status=status.HTTP_204_NO_CONTENT)
        return response


class GetDataView(APIView):
    def get(self, request, dr):
        data = UserInfoModel.objects.filter(blood_dr=dr)
        serializer = UserInfoSerializer(data, many=True)
        return Response(serializer.data)

    def post(self, request, dr):
        data = UserInfoModel.objects.all()
        serializer = UserInfoSerializer(data, many=True)
        return Response(serializer.data)


class ChatView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, from_user, to_user):  # Load Previous chats of the user
        # username = UserInfoModel.objects.filter(id = from_userId)
        # for i in username:
        #     username = i.username
        # messages = ChatMessage.objects.filter(Q(from_user = from_userId)|Q(to_user = username)) # OR query wih Q
        messages = ChatMessage.objects.filter(
            Q(from_user=from_user, to_user=to_user) | Q(from_user=to_user, to_user=from_user))
        serializer = ChatMessageSerializer(messages, many=True)
        return Response(serializer.data)


class ClientView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        online_users = Clients.objects.all()
        serializer = ClientSerializer(online_users, many=True)
        return Response(serializer.data)


class ContactUsView(APIView):
    def post(self, request):
        data = request.data
        message = '''
Name:- {name}
Email:- {email}
Mobile No:- {mobile}
Message:- {messages}
        '''.format(**data)
        send_mail(
            subject='Contact Us from BloodConnect',
            message=message,
            from_email='faqritesh@gmail.com',
            recipient_list=['riteshramchandani123@gmail.com', ],
            fail_silently=True
        )
        # email = EmailMessage('TESTING SUBJECT','TESTING BODY','faqritesh@gmail.com',['riteshramchandani123@gmail.com',])
        # email.send()
        return Response({'success': 'Mail Sent'})
