import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { AngularTiltModule } from 'angular-tilt';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AvatarModule } from 'ngx-avatar';
import { NotifierModule, NotifierOptions } from "angular-notifier";
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SliderModule } from 'angular-image-slider';
import {NgxAutoScrollModule} from "ngx-auto-scroll";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClient,HTTP_INTERCEPTORS , HttpHandler, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { LoaderInterceptorService } from './services/loader-interceptor.service';
import { ToasterComponent } from './toaster/toaster.component';
import { UiTestingComponent } from './ui-testing/ui-testing.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DrComponent } from './dr/dr.component';
import { DjangoChatComponent } from './django-chat/django-chat.component';

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: "right",
      distance: 12,
    },
    vertical: {
      position: "top",
      distance: 82,
      gap: 10,
    },
  },  
  behaviour: {
    autoHide: 8000,
    onClick: false,
    onMouseover: "pauseAutoHide",
    showDismissButton: true,
    stacking: 3,
  },
  animations: {
    enabled: true,
    show: {
      preset: "slide",
      speed: 300,
      easing: "ease",
    },
    hide: {
      preset: "fade",
      speed: 300,
      easing: "ease",
      offset: 50,
    },
    shift: {
      speed: 300,
      easing: "ease",
    },
    overlap: 150,
  },
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ToasterComponent,
    UiTestingComponent,
    HomeComponent,
    AboutComponent,
    NavBarComponent,
    DrComponent,
    DjangoChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    AngularTiltModule,
    CarouselModule,
    NotifierModule.withConfig(customNotifierOptions),
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    AvatarModule,
    SliderModule,    
    NgbModule,
    NgxAutoScrollModule
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
