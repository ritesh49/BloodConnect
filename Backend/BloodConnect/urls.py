from django.contrib import admin
from django.urls import path,include,re_path
from django.conf.urls import url
from rest_framework_simplejwt import views as jwt_views
# from rest_framework_jwt.views import obtain_jwt_token,refresh_jwt_token,verify_jwt_token
from bloodapp.views import index,redirectView,getToken
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = []
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    path('',redirectView,name='redirect'),
    path('homeApp/', index, name='homeUrl'),
    path('api/token', getToken, name='token_obtain_pair'),
    path('api/token/refresh', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('api/',include('bloodapp.urls')),
    path('admin/', admin.site.urls),
    re_path(r'$',index)
]
    # path('api/token/verify', verify_jwt_token, name='verify_jwt_token'),