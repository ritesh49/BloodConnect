from django.contrib import admin
from django.urls import path,include
from rest_framework_simplejwt import views as jwt_views
from bloodapp.views import index,redirectView

urlpatterns = [
    path('',redirectView,name='redirect'),
    path('homeApp/', index, name='homeUrl'),
    path('api/token', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('api/',include('bloodapp.urls')),
    path('admin/', admin.site.urls),
]
