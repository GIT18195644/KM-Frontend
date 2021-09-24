import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogBoxComponent } from './add-user/add-user-dialog-box.component';
import { UserProfileService } from '../shared/Services/user-profile.service';
import { ToastrService } from 'ngx-toastr';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    @ViewChild('myTable') table;
    @ViewChild('search', { static: false }) search: any;


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

    ngAfterViewInit(): void {
        fromEvent(this.search.nativeElement, 'keydown')
            .pipe(
                debounceTime(550),
                map(x => {
                    return x['target']['value']
                })
            )
            .subscribe(value => {
                this.updateFilter(value);
            });
    }

    updateFilter(val: any) {
        const value = val.toString().toLowerCase().trim();
        const count = 15;
        const keys = Object.keys(this.temp[0]);
        this.rows = this.temp.filter(item => {
            for (let i = 0; i < count; i++) {
                debugger;
                if (i != 5) {
                    // check for a match
                    if ((item[keys[i]] && item[keys[i]].toString().toLowerCase().indexOf(value) !== -1) || !value) {
                        // found match, return true to add to result set
                        return true;
                    }
                } else {
                    // check for a match
                    if ((item[keys[i]] && moment(item[keys[i]]).format('DD-MM-YYYY').toString().toLowerCase().indexOf(value) !== -1) || !value) {
                        // found match, return true to add to result set
                        return true;
                    }
                }
            }
        });

        this.table.offset = 0;
    }
}
