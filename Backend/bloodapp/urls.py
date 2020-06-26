from django.urls import path
from .views import SignUpView,RegisterView,LoginView,GetDataView,FileView,ChatView

urlpatterns = [
    # path('register',RegisterView.as_view(),name = 'register_url'),
    path('register',RegisterView.as_view()),
    path('get_user_data/<str:username>',LoginView.as_view(),name='get_user_data'),
    path('file/<str:id>/',FileView.as_view(),name='download'),
    path('chat/get_chat_messages/<str:from_userId>/',ChatView.as_view(),name='chat_messages'),
    path('sign-up',SignUpView.as_view()),
    path('get_data/<str:dr>',GetDataView.as_view())    
]