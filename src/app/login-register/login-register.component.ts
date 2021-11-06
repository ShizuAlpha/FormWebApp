import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { UserAuthService } from 'app/services/user-auth.service';
import { UserSup } from 'app/model/user.model';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {


  fNameSup!:string;
  lNameSup!:string;
  usernameSup!:string;
  emailSup!:string;
  terminalSup!:string;
  passSup!:string;
  passconfSup!:string;

  usernameSin!:string;
  passSin!:string;

  selectedTab: number = 0;

  userSup!: UserSup;

  constructor( private userAuthService: UserAuthService,
     private router: Router,
     private toastr: ToastrService,
     private userService: UserService) {

  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  signup() {
    if ((typeof this.fNameSup != 'undefined') &&
    (typeof this.lNameSup != 'undefined') &&
    (typeof this.usernameSup != 'undefined') &&
    (typeof this.emailSup != 'undefined') &&
    (typeof this.passSup != 'undefined') &&
    (typeof this.passconfSup != 'undefined') &&
    (typeof this.terminalSup != 'undefined') &&
    (this.passSup == this.passconfSup)) {
      this.userSup = {
        username: this.usernameSup,
        firstName: this.fNameSup,
        lastName: this.lNameSup,
        email: this.emailSup,
        password: this.passSup,
        terminal: this.terminalSup
      };
      this.userAuthService.createUser(this.userSup).subscribe(
        data => {
        console.log(data);
        this.toastr.success('Inscription réussit. Veulliez vous counnecter');
        this.selectedTab = 0;
      },
      error => {
        console.log(error);
        this.toastr.error('erreur');
      });
    }
    else {
      this.toastr.error('Veuiller verifier vos informations');
    }
  }


  // tslint:disable-next-line:typedef
  login(loginForm:NgForm) {
    this.userAuthService.login(loginForm.value).subscribe(
      (response: any) => {
        this.userAuthService.setRoles(response.user.roles);
        this.userAuthService.setToken(response.jwtToken);
        this.userAuthService.setUser(response.user);

        const role = response.user.roles[0].name;
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  // tslint:disable-next-line:typedef
  logout(){
    this.toastr.success('You Are Logged out');
    location.reload();
  }

}
