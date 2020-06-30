import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UiTestingComponent } from './ui-testing/ui-testing.component';
import { HomeComponent } from './home/home.component';
import { DrComponent } from './dr/dr.component';
import { DjangoChatComponent } from './django-chat/django-chat.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [  
  {path:'login',component:LoginComponent},
  {path:'blood/:name',component:DrComponent},
  {path:'register',component:RegisterComponent},  
  {path:'home',component:HomeComponent},
  {path:'about-us',component:AboutComponent},
  {path:'chat/:room_name',component:DjangoChatComponent},
  {path:'uiTest',component:UiTestingComponent},
  { path:'**',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
