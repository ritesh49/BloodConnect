from django.core.files.storage import FileSystemStorage
from django.conf import settings
import os
import random
import string
from PIL import Image

class OverwriteStorage(FileSystemStorage):
    def __init__(self,id=None): # Can't Remove this now as this is saved in DB
        super().__init__()
        pass
    # def get_available_name(self, name, max_length=None):
    #     if self.exists(name):
    #         name = name + ''.join(random.choices(string.ascii_uppercase + string.digits, k = 10))
    #     return name

    # def generate_filename(self, filename):
    #     filename = ''.join(random.choices(string.ascii_uppercase + string.digits, k = 10)) +'.png'
    #     return filename