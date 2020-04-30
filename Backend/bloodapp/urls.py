from django.urls import path
from .views import DonateReceiverView,SignUpView,RegisterView,LoginView,GetDataView

urlpatterns = [
    # path('register',RegisterView.as_view(),name = 'register_url'),
    path('register',RegisterView.as_view()),
    path('login',LoginView.as_view(),name='login'),
    path('sign-up',SignUpView.as_view()),
    path('get_data/<str:dr>',GetDataView.as_view()),
    path('dr_blood/',DonateReceiverView.as_view())    
]