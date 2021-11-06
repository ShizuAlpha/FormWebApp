import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageFormGeneratorComponent } from './page-form-generator/page-form-generator.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormElementComponent } from './page-form-generator/form-element/form-element.component'; 
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { FormPreviewComponent } from './page-form-generator/form-preview/form-preview.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgxWebstorageModule} from 'ngx-webstorage';
import { PageFormResponseComponent } from './page-form-response/page-form-response.component';
import { PageHomeComponent } from './page-home/page-home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SendDialogComponent } from './page-form-generator/form-preview/send-dialog/send-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { PageFormManagerComponent } from './page-form-manager/page-form-manager.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import {MatTabsModule} from '@angular/material/tabs';
import {ToastrModule} from 'ngx-toastr';
import { PageForbidenComponent } from './page-forbiden/page-forbiden.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserAuthService } from './services/user-auth.service';
import { PageUserManagerComponent } from './page-user-manager/page-user-manager.component';
import {MatListModule} from '@angular/material/list';
import { ModUserComponent } from './page-user-manager/mod-user/mod-user.component';
import { IonicModule } from '@ionic/angular';




@NgModule({
  declarations: [
    AppComponent,
    PageFormGeneratorComponent,
    FormElementComponent,
    FormPreviewComponent,
    ToolbarComponent,
    PageFormResponseComponent,
    PageHomeComponent,
    PageNotFoundComponent,
    SendDialogComponent,
    PageFormManagerComponent,
    LoginRegisterComponent,
    PageForbidenComponent,
    PageUserManagerComponent,
    ModUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatChipsModule,
    DragDropModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatRadioModule,
    MatToolbarModule,
    MatSlideToggleModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    MatDialogModule,
    MatTabsModule,
    ToastrModule.forRoot(),
    MatListModule,
    IonicModule.forRoot()
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    UserAuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
