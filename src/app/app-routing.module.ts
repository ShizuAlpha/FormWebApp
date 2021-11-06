import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageFormGeneratorComponent } from './page-form-generator/page-form-generator.component';
import { PageHomeComponent } from './page-home/page-home.component';
import { PageFormResponseComponent } from './page-form-response/page-form-response.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageFormManagerComponent } from './page-form-manager/page-form-manager.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { PageForbidenComponent } from './page-forbiden/page-forbiden.component';
import { AuthGuard } from './auth/auth.guard';
import { PageUserManagerComponent } from './page-user-manager/page-user-manager.component';


const routes: Routes = [
  { path : '' , redirectTo: 'answerform' , pathMatch: 'full'},
  { path : 'createform' , component :PageFormGeneratorComponent, canActivate:[AuthGuard], data:{roles:['ADMIN', 'FORM_CREATOR']}},
  { path : 'answerform' , component :PageFormResponseComponent, canActivate:[AuthGuard], data:{roles:['ADMIN', 'FORM_CREATOR', 'FORM_READER']}},
  { path : 'manageform' , component :PageFormManagerComponent, canActivate:[AuthGuard], data:{roles:['ADMIN', 'FORM_CREATOR']}},
  { path : 'manageuser' , component :PageUserManagerComponent, canActivate:[AuthGuard], data:{roles:['ADMIN']}},
  { path : 'login' , component :LoginRegisterComponent},
  { path : 'forbiden' , component :PageForbidenComponent},
  { path : "**" , component :PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
