from django.urls import path
from .views import SignUpView,RegisterView,LoginView,GetDataView,FileView,ChatView,ClientView,ContactUsView,ActivationView,send_trial_mail,download_resume
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    # path('register',RegisterView.as_view(),name = 'register_url'),
    path('register/',RegisterView.as_view()),
    path('get_user_data/<str:username>',LoginView.as_view(),name='get_user_data'),
    path('file/<str:id>/',FileView.as_view(),name='download'),
    path('chat/get_chat_messages/<str:from_user>/<str:to_user>/',ChatView.as_view(),name='chat_messages'),
    path('chat/get_online_users/',ClientView.as_view()),
    path('logout/',LoginView.as_view()),    
    path('download/resume/',download_resume),    
    path('create/account/<str:username>/',RegisterView.as_view()),
    path('key_verify/<str:key>/',ActivationView.as_view()),    
    path('key_refresh/<str:username>/',ActivationView.as_view()),    
    path('contact_us/',ContactUsView.as_view()),
    path('sign-up',SignUpView.as_view()),
    path('get_data/<str:dr>',GetDataView.as_view())    
]