from django.shortcuts import render
from rest_framework import generics,permissions
from .models import UserInfoModel, ChatMessage,Clients
from rest_framework.decorators import APIView
from django.db.models import Q
from rest_framework.parsers import JSONParser
from .serializers import SignUpSerializer,UserInfoSerializer,ChatMessageSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.http import HttpResponse, HttpResponseNotFound, Http404,  HttpResponseRedirect, FileResponse
from django.shortcuts import render, get_object_or_404, get_list_or_404, reverse
from django.utils.encoding import smart_str
from django.conf import settings

def redirectView(request):
    return HttpResponseRedirect(reverse('homeUrl'))

def index(request):
    return render(request,'index.html')

class SignUpView(APIView):
    def post(self,request):        
        serializer = SignUpSerializer(data=request.data)        
        if serializer.is_valid():            
            User.objects.create_user(**request.data)            
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status.HTTP_409_CONFLICT)

class RegisterView(APIView):
    def put(self,request):
        serializer = UserInfoSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status.HTTP_201_CREATED)
        return Response(serializer.errors,status.HTTP_404_NOT_FOUND)

class LoginView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self,request,username):        
        userInfo = UserInfoModel.objects.filter(username = username)
        serializer = UserInfoSerializer(userInfo,many=True)
        return Response(serializer.data)

class FileView(APIView):
    def post(self,request,id):  # For uploading Files according to UserId        
        if request.FILES:
            data = UserInfoModel.objects.get(pk=id)
            data.profile_image = request.FILES.get('file');
            data.save()
            return Response({'success':'Profile Pic Succesfully Uploaded'},status=status.HTTP_201_CREATED)
        else:
            return Response({'error':'No File Attached'},status=status.HTTP_204_NO_CONTENT)            
    def get(self,request,id):   # For downloading image according to UserId
        data = UserInfoModel.objects.get(pk=id)
        image_url = str(data.profile_image)
        image_path = settings.MEDIA_ROOT + '\\' +image_url.replace('/','\\')
        print(image_path)
        try:
            with open(image_path,'rb') as image_upload:
                image_data = image_upload.read()
            response = HttpResponse(image_data,content_type='image/png')
            response['Content-Disposition'] = 'attachment; filename=%s' % smart_str(image_url.split('/')[-1])
            response['X-Sendfile'] = smart_str(image_path)
        except IOError:
            response = Response({'error':'File Does Not Exists'},status=status.HTTP_204_NO_CONTENT)
        return response

class GetDataView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self,request,dr):
        data = UserInfoModel.objects.filter(blood_dr = dr)
        serializer = UserInfoSerializer(data , many = True)        
        return Response(serializer.data)
    def post(self,request,dr):
        data = UserInfoModel.objects.all()
        serializer = UserInfoSerializer(data , many = True)        
        return Response(serializer.data)

class ChatView(APIView):
    def get(self,request,from_userId): # Load Previous chats of the user
        username = UserInfoModel.objects.filter(id = from_userId)
        for i in username:
            username = i.username
        messages = ChatMessage.objects.filter(Q(from_user = from_userId)|Q(to_user = username)) # OR query wih Q
        serializer = ChatMessageSerializer(messages, many=True)
        return Response(serializer.data)
        