import json
from asgiref.sync import async_to_sync,sync_to_async
from channels.generic.websocket import WebsocketConsumer
from .models import Clients,ChatMessage,UserInfoModel
from django.db import close_old_connections
from django.contrib.auth.models import User
from channels.layers import get_channel_layer
from channels.db import database_sync_to_async

class DRChatConsumer(WebsocketConsumer):
    def connect(self):
        # Store the Channel information in Clients model
        self.from_username = self.scope['url_route']['kwargs']['username']
        user = User.objects.get(username = self.from_username)        
        self.username = user.username
        Clients.objects.create(channel_name = self.channel_name,username = self.username)
        self.accept()

    def disconnect(self,close_code):
        # Leave the Room Channel, so data about that channel is deleted from DB
        Clients.objects.filter(username = self.from_username).delete()

    # Receive Message From Web Socket
    def receive(self,text_data):
        text_data_json = json.loads(text_data)        
        chat_create = ChatMessage.objects.create(**text_data_json)        
        to_user = text_data_json['to_user']
        channel_data = Clients.objects.filter(username = to_user)        
        for i in channel_data:
            to_channel_name = i.channel_name

        # Send message to Channel Name of user , if the user is online
        channel_layer = get_channel_layer()        
        async_to_sync(channel_layer.send)(to_channel_name,{
            "type":"chat_message",
            "message_obj":text_data_json
        })
    
    def chat_message(self,event):
        message = event['message_obj']        
        # Send message to WebSocket
        self.send(text_data=json.dumps(message))