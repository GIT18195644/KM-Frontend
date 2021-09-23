import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddUserDialogBoxComponent} from './add-user/add-user-dialog-box.component';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    constructor( public dialog: MatDialog) {
    }

    ngOnInit() {
    }

    onAddUser() {
        const matDialogRef = this.dialog.open(AddUserDialogBoxComponent, {
            width: '750px',
            // data: {}
        });
    }
}
