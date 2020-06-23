import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UiTestingComponent } from './ui-testing/ui-testing.component';
import { HomeComponent } from './home/home.component';
import { DrComponent } from './dr/dr.component';


const routes: Routes = [  
  {path:'login',component:LoginComponent},
  {path:'blood/:name',component:DrComponent},
  {path:'register',component:RegisterComponent},  
  {path:'home',component:HomeComponent},
  {path:'uiTest',component:UiTestingComponent},
  { path:'**',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }