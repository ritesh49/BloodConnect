import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { AngularTiltModule } from 'angular-tilt';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AvatarModule } from 'ngx-avatar';
import { NotifierModule, NotifierOptions } from "angular-notifier";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DonorComponent } from './donor/donor.component';
import { LoginComponent } from './login/login.component';
import { ReceiverComponent } from './receiver/receiver.component';
import { RegisterComponent } from './register/register.component';
import { HttpClient,HTTP_INTERCEPTORS , HttpHandler, HttpClientModule } from '@angular/common/http';
import { LoaderInterceptorService } from './services/loader-interceptor.service';
import { ToasterComponent } from './toaster/toaster.component';
import { HomePageComponent } from './home-page/home-page.component';

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 2
    },
    vertical: {
      position: 'top',
      distance: 2,
      gap: 0
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 8000,
    onClick: false,
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 3
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

@NgModule({
  declarations: [
    AppComponent,
    DonorComponent,
    LoginComponent,
    ReceiverComponent,
    RegisterComponent,
    ToasterComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    AngularTiltModule,
    NotifierModule.withConfig(customNotifierOptions),
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    AvatarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    },
    HttpClient,
    ToasterComponent
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
