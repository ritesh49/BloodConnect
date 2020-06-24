from django.contrib import admin
from django.urls import path,include,re_path
from django.conf.urls import url
from rest_framework_simplejwt import views as jwt_views
from bloodapp.views import index,redirectView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('',redirectView,name='redirect'),
    path('homeApp/', index, name='homeUrl'),
    path('api/token', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('api/',include('bloodapp.urls')),
    path('admin/', admin.site.urls),
    re_path(r'$',index)
]