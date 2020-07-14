import { Component, OnInit, ViewChild } from '@angular/core';
import { ToasterComponent } from '../toaster/toaster.component';
import { AuthorizeService } from '../services/authorize.service';
import { SignUp } from '../entities/SignUp';
import { UserInfo } from '../entities/UserInfo';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { FileService } from '../services/file.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatStepper, MatHorizontalStepper } from '@angular/material/stepper';
import { data } from 'jquery';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [FileService],
})
export class RegisterComponent implements OnInit {
  public registerInfo = new UserInfo();
  public signUpInfo = new SignUp();
  @ViewChild('stepper', { static: true }) private myStepper: MatStepper;
  @ViewChild(MatHorizontalStepper) stepper: MatHorizontalStepper;
  profile_img = '/static/front_end/assets/images/default_image.jpg';
  selectedFile: File;
  verify: boolean;
  value: string;
  CreateAccountFormGroup: FormGroup;
  PersonalDetailFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isLinear = true;

  constructor(
    private toaster: ToasterComponent,
    private authorize: AuthorizeService,
    private router: Router,
    private common: CommonService,
    private _formBuilder: FormBuilder,
    private fileservice:FileService
  ) {}

  ngOnInit() {
    this.CreateAccountFormGroup = this._formBuilder.group(
      {
        first_name: ['', [Validators.required, Validators.minLength(3)]],
        last_name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
            ),
          ],
        ],
        username: ['', [Validators.required, Validators.minLength(2)]],
      },
      { updateOn: 'blur' }
    );
    this.PersonalDetailFormGroup = this._formBuilder.group({
      medications: [''],
      bloodGroup: [
        '',
        [Validators.required, Validators.pattern(/(A|B|AB|O)[+-]/)],
      ],
      birth_date: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      phone_no: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(15),
        ],
      ],
      gender: ['-1', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  //TODO: See replacement for these getters
  get medications() {
    return this.PersonalDetailFormGroup.get('medications');
  }
  get bloodGroup() {
    return this.PersonalDetailFormGroup.get('bloodGroup');
  }
  get birth_date() {
    return this.PersonalDetailFormGroup.get('birth_date');
  }
  get height() {
    return this.PersonalDetailFormGroup.get('height');
  }
  get weight() {
    return this.PersonalDetailFormGroup.get('weight');
  }
  get phone_no() {
    return this.PersonalDetailFormGroup.get('phone_no');
  }
  get gender() {
    return this.PersonalDetailFormGroup.get('gender');
  }
  get first_name() {
    return this.CreateAccountFormGroup.get('first_name');
  }
  get password() {
    return this.CreateAccountFormGroup.get('password');
  }
  get username() {
    return this.CreateAccountFormGroup.get('username');
  }
  get last_name() {
    return this.CreateAccountFormGroup.get('last_name');
  }
  get email() {
    return this.CreateAccountFormGroup.get('email');
  }

  checkProperties(obj, exceptions: string[], properties: string[]) {    
    for (var key in properties) {
      if (!exceptions.includes(key) && (obj[key] || obj[key] == ''))
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
        document
          .getElementById('profileImage')
          .setAttribute('src', reader.result as string);
      };
      reader.readAsDataURL(this.selectedFile);
    } else console.error('Select Image File only');
  }

  // TODO: if a user with particular account send too many request that block it's user and send activation mail
  checkUsername() {
    if (this.CreateAccountFormGroup.valid) {
      this.authorize
        .checkUsername(this.CreateAccountFormGroup.controls['username'].value)
        .subscribe(
          (data) => {
            if (data['success']) {
              this.stepper.selected.completed = true;
              this.stepper.selected.editable = false;
              this.stepper.next();
            }
          },
          (err) => {
            if (err.status == 409)
              this.toaster.showWarning('Username already taken');
            else this.toaster.showError('Error Occured Contact Support');
          }
        );
    } else
      this.toaster.showError(
        'Invalid Form Submission, Make Mure You Fill Each Field Appropiately'
      );
  }

  uploadImage(userId:number) {
    let image_data = new FormData();
    image_data.append('file',this.selectedFile);
    this.fileservice.uploadFile(image_data,userId)
    .subscribe(data => {
      if(data['success'])
        this.toaster.showSuccess('Profile Picture Succesfully Changed')
    })
  }

  createAccount() {
    // console.log(this.CreateAccountFormGroup.controls);
    if (this.CreateAccountFormGroup.valid) {
      this.authorize.SignUpUSer(this.CreateAccountFormGroup.value).subscribe(
        (data) => {
          if (data['success'])
            this.toaster.showSuccess(
              'Account Succesfully Created, Verify Account by provided link in E-mail'
            );
        },
        (err) => {
          // for (let field in err.error) {
          //   for (let j = 0; j < err.error[field].length; j++) {
          //     if (field == 'username') {
          //       this.toaster.showWarning(
          //         `Account Already Registered with ${this.registerInfo.username} Username , Try login`
          //       );
          //     } else this.toaster.showError(field + ':-' + err.error[field][j]);
          //   }
          // }
          this.toaster.showError('Error Occured , Drop a message in Contact Us');
        }        
      );
    } else this.toaster.showWarning('Fill All Fields with Valid Values for Creating Account');
  }

  registerUser() {    
    if (this.PersonalDetailFormGroup.valid) {
      this.createAccount();      
      this.registerInfo = {...this.CreateAccountFormGroup.value,...this.PersonalDetailFormGroup.value,blood_dr:'donor'}
      this.registerInfo['phone_no'] = JSON.stringify(this.registerInfo['phone_no']);
      this.authorize.registerUser(this.registerInfo).subscribe(
        (data) => {
          if(this.selectedFile)
            this.uploadImage(data.id)
          console.log(data);
        },
        (err) => console.log(err),
        () => {
          let userObj = {
            username: this.registerInfo.username,
            password: this.CreateAccountFormGroup.controls['password'].value,
          };
          this.common.userObg = userObj;
          this.router.navigate(['login']);
        }
      );
    } else this.toaster.showError('Invalid Personal Details Form Submission');
  }
}
