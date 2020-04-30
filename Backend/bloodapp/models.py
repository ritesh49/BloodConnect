from django.db import models
from django.contrib.auth.models import User


class UserInfoModel(models.Model):
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
    phone_no = models.IntegerField(default=0)
    gender = models.CharField(default='', max_length=8)

    def save(self,*args,**kargs):
        self.username = self.username.lower()
        self.blood_dr = self.blood_dr.lower()        
        return super(UserInfoModel,self).save(*args,**kargs)

    def __str__(self):
        return self.username


class DonorReceiverModel(models.Model):
    user = models.ForeignKey(
        'auth.User', related_name='snippets', on_delete=models.CASCADE)
    DateOfSubmission = models.DateTimeField(name='dos', auto_now_add=True)

    def __str__(self):
        return self.user
