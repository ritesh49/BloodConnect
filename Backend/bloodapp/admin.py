from django.contrib import admin
from .models import UserInfoModel,Clients,ChatMessage,Profile

# Register your models here.
admin.site.register(UserInfoModel)
admin.site.register(Clients)
admin.site.register(ChatMessage)
admin.site.register(Profile)