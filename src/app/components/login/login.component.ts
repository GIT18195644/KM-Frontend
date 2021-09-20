import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from '../../shared/dto/login';
import { LoginService } from '../../shared/Services/login.service';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    hide = true;
    isLoginError: boolean = false;
    userId: any;
    userRole: any;
    loginModel: Login;
    public form: FormGroup;

    constructor(private toastr: ToastrService, private router: Router, public fb: FormBuilder, public logservice: LoginService) {
        this.form = this.fb.group({
            'username': [null, Validators.compose([Validators.required])],
            'password': [null, Validators.compose([Validators.required])]
        });
    }

    ngOnInit(): void {
    }

    onLoginClick(values: Object): void {
        debugger;
        // this.router.navigate(['/dashboard'])
        if (this.form.valid) {
            this.loginModel = new Login();
            this.loginModel = Object.assign({}, this.loginModel, this.form.value);

            this.logservice.userAuthentication(this.loginModel).subscribe((data: any) => {
                // console.log("User Response: " + this.logservice.userResponse);
                this.userId = data.UserId;
                this.userRole = data.UserRole;

                // Encrypt Token Key
                var TokenName = CryptoJS.AES.encrypt('token', '01234');
                var TokenValue = CryptoJS.AES.encrypt(data.Token, '01234');
                var Token_Name_encrypt = TokenName.toString();
                var Token_Value_encrypt = TokenValue.toString();

                // Encrypt Token Expiration Key
                var TokenExpirationName = CryptoJS.AES.encrypt('tokenExpiration', '12345');
                var TokenExpirationValue = CryptoJS.AES.encrypt(data.TokenExpiration, '12345');
                var Token_Expiration_Name_encrypt = TokenExpirationName.toString();
                var Token_Expiration_Value_encrypt = TokenExpirationValue.toString();

                // Encrypt User Role Key
                var UserRoleName = CryptoJS.AES.encrypt('UserRole', '23456');
                var UserRoleValue = CryptoJS.AES.encrypt(data.UserRole, '23456');
                var User_Role_Name_encrypt = UserRoleName.toString();
                var User_Role_Value_encrypt = UserRoleValue.toString();

                // Encrypt User ID Key
                var UserIdName = CryptoJS.AES.encrypt('UserId', '34567');
                var UserIdValue = CryptoJS.AES.encrypt(data.UserId, '34567');
                var UserId_Name_encrypt = UserIdName.toString();
                var UserId_Value_encrypt = UserIdValue.toString();

                localStorage.setItem('token', data.Token);
                localStorage.setItem('tokenExpiration', data.TokenExpiration);
                localStorage.setItem('UserRole', data.UserRole);
                localStorage.setItem('UserId', data.UserId);

                this.openSnackBarSuccess();
                this.router.navigate(['dashboard']);
            }, (err: HttpErrorResponse) => {
                this.openSnackBarFail();
                this.isLoginError = true;
            });
        }

    }

    openSnackBarFail() {
        this.toastr.error("Incorrect username or password", 'Fail');
    }

    openSnackBarSuccess() {
        this.toastr.success("Login", 'Success');
      }
}

