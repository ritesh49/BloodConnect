from django.shortcuts import render
from rest_framework import generics,permissions
from .models import DonorReceiverModel,UserInfoModel
from rest_framework.decorators import APIView
from rest_framework.parsers import JSONParser
from .serializers import DonateReceiveSerializer,SignUpSerializer,UserInfoSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
import requests
from django.http import HttpResponse, HttpResponseNotFound, Http404,  HttpResponseRedirect
from django.shortcuts import render, get_object_or_404, get_list_or_404, reverse

def redirectView(request):
    return HttpResponseRedirect(reverse('homeUrl'))


def index(request):
    return render(request,'index.html')

class DonateReceiverView(APIView):
    def get(self,request):
        drs=DonorReceiverModel.objects.all()
        serializer=DonateReceiveSerializer(drs,many=True)        
        return Response(serializer.data)
    
    def post(self,request):
        serializer=DonateReceiveSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=201)
        return Response(serializer.errors,404)

class SignUpView(APIView):
    def post(self,request):        
        serializer = SignUpSerializer(data=request.data)        
        if serializer.is_valid():            
            User.objects.create_user(**request.data)            
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status.HTTP_404_NOT_FOUND)

class RegisterView(APIView):
    def put(self,request):
        serializer = UserInfoSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status.HTTP_201_CREATED)
        return Response(serializer.errors,status.HTTP_404_NOT_FOUND)

class LoginView(APIView):
    def post(self,request,format = None):
        username = request.data['username']
        password = request.data['password']        
        new_user=authenticate(username = username,password = password)
        if new_user is not None:
            url = 'http://localhost:8000/api/token'
            values = {
                'username':username,
                'password':password
            }
            r = requests.post(url,data = values)
            token_data = dict(r.json())
            userInfo = UserInfoModel.objects.filter(username = username).values()
            userInfo = [entry for entry in userInfo]
            
            try:
                for i in userInfo[0]:                    
                    token_data[i] = userInfo[0][i]                
            except:
                print('Error Occured in unpacking')
            return Response(token_data)
        else:
            context = {'detail':'Either Email or Password is incorrect'}
            return Response(context,status.HTTP_404_NOT_FOUND)

class GetDataView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self,request,dr):
        data = UserInfoModel.objects.filter(blood_dr = dr)
        serializer = UserInfoSerializer(data , many = True)        
        # try:            
        #     for i in loginInfo[0]:                
        #         if i =='first_name' or i == 'last_name':
        #             data[0][i] = loginInfo[0][i]
        #     for j,k in data[0].items():
        #         res[j]=k
        # except:
        #     print('error Occured')
        return Response(serializer.data)