from django.db import models
from django.contrib.auth.models import User
from PIL import Image
from django_resized import ResizedImageField
from .storage import OverwriteStorage

class UserInfoModel(models.Model):
    image_width = models.PositiveIntegerField(default=300);
    image_height = models.PositiveIntegerField(default=300);
    profile_image = ResizedImageField(size=[200, 200],crop=['middle', 'center'],upload_to='profile_photo',blank=True , width_field='image_width', height_field='image_height', default='profile_photo/profile_image.jpg' ,storage = OverwriteStorage(),max_length=100)
    email = models.EmailField(default='')
    username = models.CharField(default='', max_length=50)
    blood_dr = models.CharField(default='', max_length=10)
    first_name = models.CharField(default ='',max_length=20)
    last_name = models.CharField(default ='',max_length=20)
    medications = models.CharField(default='', max_length=100,blank=True)
    bloodGroup = models.CharField(default='', max_length=3)
    birth_date = models.DateField(default='2020-04-29')
    height = models.IntegerField(default=0)
    weight = models.IntegerField(default=0)
    phone_no = models.BigIntegerField(default=0)
    gender = models.CharField(default='', max_length=8)

    def save(self,*args,**kargs):
        self.username = self.username.lower()
        self.blood_dr = self.blood_dr.lower()
        # if not self.profile_image:
        #     return
        # super(UserInfoModel,self).save() # TODO: Shift this image saving logic to storage.py
        # image = Image.open(self.profile_image)
        # (width,height) = image.size    
        # size = (300,300)
        # image = image.resize(size, Image.ANTIALIAS)
        # image.save(self.profile_image.upload_to)
        return super(UserInfoModel,self).save(*args,**kargs)

    '''
        FUNCTION FOR OVERWRITING FILE IF IT ALREADY EXISTS
        def save(self, *args, **kwargs):
            try:
                this = MyModelName.objects.get(id=self.id)
                if this.MyImageFieldName != self.MyImageFieldName:
                    this.MyImageFieldName.delete()
            except: pass
            super(MyModelName, self).save(*args, **kwargs)
    '''

    def __str__(self):
        return self.username    

class Clients(models.Model):
    channel_name = models.CharField(default='', max_length=100)
    username = models.CharField(default='', max_length=50)
    is_typing = models.BooleanField(default=False,blank=True)

    def __str__(self):
        return self.username  

class ChatMessage(models.Model):
    from_user = models.CharField(default = '',max_length = 50)
    to_user = models.CharField(default = '',max_length = 50)
    date_sent = models.DateTimeField(auto_now=True,max_length = 50)
    message = models.CharField(default = '',max_length = 500)    

    def __str__(self):
        return self.from_user

class Profile(models.Model):
    user = models.OneToOneField(User,related_name = 'profile' ,on_delete=models.CASCADE)
    activation_key = models.CharField(max_length = 256,blank = True)
    verification_key = models.CharField(max_length=256, blank = True)
    key_expires = models.DateTimeField()

    def __str__(self):
        return self.user.username
    