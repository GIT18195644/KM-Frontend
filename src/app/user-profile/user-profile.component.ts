import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {UserProfileService} from '../shared/Services/user-profile.service';
import {MatDialog} from '@angular/material/dialog';
import {ChangePasswordDialogBoxComponent} from './change-password/change-password-dialog-box.component';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
    userData: [];
    Company;
    UserName;
    UserRole;
    Email;
    Name;
    Surname;
    Address;
    Gender;
    Birthday;
    Phone;

    public genders = [
        {name: 'Male'},
        {name: 'Female'}
    ];
    public form: FormGroup;
    public role: any;
    public userId: any;

    gender = this.genders[0];

    constructor(public fb: FormBuilder,
                private toastr: ToastrService,
                public profileService: UserProfileService,
                public dialog: MatDialog) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            ctrlcompany: [null, [Validators.required]],
            ctrluserName: [null, [Validators.required]],
            ctrlrole: [null, [Validators.required]],
            ctrlemail: [null, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9._]+@[a-z0-9]+(?:\.[a-z]{2,4})*$/)])],
            ctrlName: [null, [Validators.required]],
            ctrlSurname: [null],
            ctrladdress: [null, [Validators.required]],
            ctrlsex: [null, [Validators.required]],
            ctrlbod: [null, [Validators.required]],
            ctrlphone: [null, Validators.compose([Validators.required, Validators.pattern(/^[0-9]{8,10}$/)])]
        });

        this.role = localStorage.getItem('UserRole');
        this.userId = localStorage.getItem('UserId');

        this.fetch();
    }

    fetch() {
        this.profileService.getLoggedInUserDetails(this.userId).subscribe(data => {
            if (data !== null) {
                this.userData = this.profileService.userProfile[0];
                this.Company = this.profileService.userProfile[0].Company;
                this.UserName = this.profileService.userProfile[0].UserName;
                this.UserRole = this.profileService.userProfile[0].UserRole;
                this.Email = this.profileService.userProfile[0].Email;
                this.Name = this.profileService.userProfile[0].Name;
                this.Surname = this.profileService.userProfile[0].Surname;
                this.Address = this.profileService.userProfile[0].Address;
                this.Gender = this.profileService.userProfile[0].Gender;
                this.Birthday = this.profileService.userProfile[0].Birthday;
                this.Phone = this.profileService.userProfile[0].Phone;
            }
        });
    }

    public onSubmit(value: any): void {
        debugger;
        this.profileService.updateLoggedInUserDetails(value).subscribe(data => {
            if (this.profileService.updateProfileData.IsSuccess) {
                this.fetch();
                this.ProfileUpdateSuccess();
            } else {
                this.fetch();
                this.ProfileUpdateFail();
            }
        })
        console.log(value);
    }

    ProfileUpdateSuccess() {
        this.toastr.success('Profile data updated', 'Success');
    }

    ProfileUpdateFail() {
        this.toastr.error('Email is already taken', 'Profile data update Fail');
    }

    onChangePassword() {
      const matDialogRef = this.dialog.open(ChangePasswordDialogBoxComponent, {
        width: '300px',
        data: {}
      });
    }
}
