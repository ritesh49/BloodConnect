from django.urls import path
from .views import DonateReceiverView,SignUpView,RegisterView,LoginView,GetDataView,chatIndex,room

urlpatterns = [
    # path('register',RegisterView.as_view(),name = 'register_url'),
    path('register',RegisterView.as_view()),
    path('get_user_data/<str:username>',LoginView.as_view(),name='get_user_data'),
    path('',chatIndex,name='index'),
    path('<str:room_name>/',room,name='room'),
    path('sign-up',SignUpView.as_view()),
    path('get_data/<str:dr>',GetDataView.as_view()),
    path('dr_blood/',DonateReceiverView.as_view())
]