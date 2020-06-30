import { Component, OnInit } from '@angular/core';
import { ToasterComponent } from '../toaster/toaster.component';
import { AuthorizeService } from '../services/authorize.service';
import { SignUp } from '../entities/SignUp';
import { UserInfo } from '../entities/UserInfo';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [FileService]
})
export class RegisterComponent implements OnInit {
  public registerInfo = new UserInfo();  
  password: string;
  secPassword: string;
  profile_img = '/static/front_end/assets/images/default_image.jpg';
  selectedFile: File;

  constructor(
    private toaster: ToasterComponent,
    private authorize: AuthorizeService,
    private router: Router,
    private common: CommonService
  ) {}

  ngOnInit() {}

  resizeImage = (settings: { // TODO: Resize image with this function
    maxSize: number;
    file: File;
  }) => {
    const file = settings.file;
    const maxSize = settings.maxSize;
    const reader = new FileReader();
    const cnvImage = new Image();
    const canvas = document.createElement('canvas');
    const dataURItoBlob = (dataURI: string) => {
      const bytes = dataURI.split(',')[0].indexOf('base64') >= 0 ?
          atob(dataURI.split(',')[1]) :
          unescape(dataURI.split(',')[1]);
      const mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const max = bytes.length;
      const ia = new Uint8Array(max);
      for (var i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);
      return new Blob([ia], {type:mime});
    };
    const resize = () => {
      let width = cnvImage.width;
      let height = cnvImage.height;
  
      if (width > height) {
          if (width > maxSize) {
              height *= maxSize / width;
              width = maxSize;
          }
      } else {
          if (height > maxSize) {
              width *= maxSize / height;
              height = maxSize;
          }
      }
  
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(cnvImage, 0, 0, width, height);
      let dataUrl = canvas.toDataURL('image/jpeg');
      return dataURItoBlob(dataUrl);
    }
  }

checkProperties(obj,exceptions:string[],properties:string[]) {
    debugger;
    for (var key in properties) {
        if (!exceptions.includes(key) && (obj[key] || obj[key] == ""))
            return false;
    }
    return true;
}

  getImage(event) {
    let file = event.target.files
      ? event.target.files[0]
      : console.error('No File Selected');
    if (file && file.type.match(/image.*/)) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (imageEvent) => {
        document.getElementById("profileImage").setAttribute('src',reader.result as string);
      };
      reader.readAsDataURL(this.selectedFile);
    } else console.error('No File Selected');
  }

  registerUser() {
    if (Object.keys(this.registerInfo).length == 12) {
      debugger
      let regObj = new SignUp();
      regObj.email = this.registerInfo.email;
      regObj.first_name = this.registerInfo.first_name;
      regObj.last_name = this.registerInfo.last_name;
      regObj.password = this.password;
      regObj.username = this.registerInfo.username;
      if(this.selectedFile) {
        let imageData = new FormData();
        this.registerInfo.profile_image = imageData.append('profile_image',this.selectedFile);
      }
      // For Registering User
      this.authorize.SignUpUSer(regObj).subscribe(
        (data) => {
          console.log(data);
        },
        (err) => {
          for (let field in err.error) {
            for (let j = 0; j < err.error[field].length; j++) {
              if (field == 'username') {
                this.toaster.showWarning(
                  `Account Already Registered with ${this.registerInfo.username} Username , Try login`
                );
                this.router.navigate(['login']);
              } else this.toaster.showError(field + ':-' + err.error[field][j]);
            }
          }
        },
        () => {
          this.authorize.registerUser(this.registerInfo).subscribe(
            (data) => {
              console.log(data);
            },
            (err) => console.log(err),
            () => {
              let userObj = {
                username: this.registerInfo.username,
                password: this.password,
              };
              this.common.userObg = userObj;
              this.router.navigate(['login']);
            }
          );
        }
      );
    } else {
      if (this.password != this.secPassword)
        this.toaster.showError('Both Passwords Should Match');
      else
        this.toaster.showWarning(
          'Please Fill The required Fields first before Submitting Form'
        );
    }
  }
}
