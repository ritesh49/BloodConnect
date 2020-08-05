# Blood Connect

This is a project based on the blood donation in which donor and receiver can interact with each other through my [website](https://blood-connect-major.herokuapp.com)

It is a [Website](https://blood-connect-major.herokuapp.com) in which the donor and receiver directly interacts through my website ,and they can chat , share location, Video Call and audio call through my website.

## DEPLOYED LINK
[https://blood-connect-major.herokuapp.com](https://blood-connect-major.herokuapp.com)

## Technologies Used
- **Frontend**:- Angular 8
- **Backend**:- Django 2.2, Channels 2.4.0
- **Database**: PostgreSQL 12.3

## Prerequisites

- Node JS installed
- Channels 2.4.0 installed

## How to run App
For running project first you need to make a virtual environment for Django.

#### Setting Virtual Environment
<code>
> virtualenv <v_name>
> cd <v_name>/Scripts/activate
> pip install -r requirements.txt
</code>

#### Doing Django Configuration
Fill your own Gmail Id Pass here from which you want to send mail.
<code>
> EMAIL_HOST_USER = '<YOUR_EMAIL>'
> EMAIL_HOST_PASSWORD = '<YOUR_EMAIL_PASSWORD>'
</code>

If using Redis as Channel Layer so also install channels_redis
and for Redis Channel Layer Configuration put the following code in Backend/BloodConnect/settings.py
<code>
> CHANNEL_LAYERS = {
>    "default": {
>        "BACKEND": "channels_redis.core.RedisChannelLayer",
>        "CONFIG": {
>            "hosts": [("127.0.0.1", 6379)],
>        },
>    },
> }
</code>

After the Virtual environment is running start Django server by
> python manage.py runserver

#### Running Angular Code.
<code>
> npm i -- for installing all dependencies
> ng serve
</code>

I have deployed this project in heroku and for deploying the ASGI Django Server you need to do some configurations , so you can see the Procfile through which you can get an idea of how to run ASGI Server in Production.

Any bug fixes are welcome.
