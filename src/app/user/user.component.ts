import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogBoxComponent } from './add-user/add-user-dialog-box.component';
import { UserProfileService } from '../shared/Services/user-profile.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    @ViewChild('myTable') table;
    // errors fixing
    pageSize: any;
    rowCount: any;
    curPage: any;
    public role: any;
    public userId: any;

    public rows = [];
    public temp = [];

    constructor(public dialog: MatDialog, public userprofile: UserProfileService, private toastr: ToastrService) {
    }

    ngOnInit() {
        this.role = localStorage.getItem('UserRole');
        this.userId = localStorage.getItem('UserId');
        this.fetch();
    }

    fetch() {
        this.userprofile.getAllUsers()
            .subscribe(success => {
                if (success) {
                    this.rows = this.userprofile.AllUsers;
                    this.temp = [...this.rows];
                }
            });
    }

    onAddUser() {
        const matDialogRef = this.dialog.open(AddUserDialogBoxComponent, {
            width: '750px',
            // data: {}
        });
    }

    DeleteUser(row) {
        this.toastr.success("User deleted successfully", 'Success');
    }
}
