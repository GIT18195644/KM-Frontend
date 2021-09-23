import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-add-user-dialog-box',
    templateUrl: './add-user-dialog-box.component.html',
    styleUrls: ['./add-user-dialog-box.component.css']
})
export class AddUserDialogBoxComponent implements OnInit {
    addUserForm: FormGroup;

    constructor(private dialogRef: MatDialogRef<AddUserDialogBoxComponent>,
                @Inject(MAT_DIALOG_DATA) public data ) {
    }

    ngOnInit(): void {
    }

    onChangePassword() {
    }

    onAddUser() {
    }
}
