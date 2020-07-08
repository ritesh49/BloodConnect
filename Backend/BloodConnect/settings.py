import os
import datetime
import socket
import urllib

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '<YOUR_PROJECT_SECREY_KEY>'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

EMAIL_HOST = socket.gethostbyname('smtp.gmail.com')
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_USE_SSL = False
EMAIL_HOST_USER = '<YOUR_EMAIL>'
EMAIL_HOST_PASSWORD = '<YOUR_EMAIL_PASSWORD>'
# EMAIL_BACKEND = 'BloodConnect.email_backend.DKIMBackend'
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
# EMAIL_BACKEND = 'django_smtp_ssl.SSLEmailBackend'

DKIM_DOMAIN = '<DKIM_DOMAIN>'
DKIM_PRIVATE_KEY = '<DKIM_PRIVATE_KEY>'
DKIM_SELECTOR = '<DKIM_SELECTOR>'

ALLOWED_HOSTS = ['blood-connect-major.herokuapp.com', 'localhost']


# Application definition

INSTALLED_APPS = [
    'channels',
    'corsheaders',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'bloodapp.apps.BloodappConfig',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',    
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware'    
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
}
# JWT_AUTH = {
#     # how long the original token is valid for
#     'JWT_EXPIRATION_DELTA': datetime.timedelta(days=2),

#     'JWT_ALLOW_REFRESH': True,

#     # this is the maximum time AFTER the token was issued that
#     # it can be refreshed.  exprired tokens can't be refreshed.
#     'JWT_REFRESH_EXPIRATION_DELTA': datetime.timedelta(days=7),

#     'JWT_VERIFY_EXPIRATION': False,
# }

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': datetime.timedelta(days=2),
    'REFRESH_TOKEN_LIFETIME': datetime.timedelta(days=7),
    'ALGORITHM': 'HS512',
    'SIGNING_KEY': SECRET_KEY+'#$%sdfd%!dasd',
    'AUTH_HEADER_TYPES':('Bearer',),
}

CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True

# CORS_ORIGIN_WHITELIST = ( 'http://localhost:4200', )

ROOT_URLCONF = 'BloodConnect.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'BloodConnect.wsgi.application'

ASGI_APPLICATION = 'BloodConnect.routing.application'


# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#     }
# }
# ''' POSTGRE SQL DATABSE CONNECTION '''

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer"
    }
}


# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Kolkata'

USE_I18N = True

USE_L10N = True

USE_TZ = False

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/

# Media Files Configuration

MEDIA_URL = '/media/'

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

STATIC_URL = '/static/'

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "staticfiles")
]

STATIC_ROOT = os.path.join(BASE_DIR, "static")
