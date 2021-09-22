import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-change-password-dialog-box',
    templateUrl: './change-password-dialog-box.component.html',
    styleUrls: ['./change-password-dialog-box.component.css']
})
export class ChangePasswordDialogBoxComponent implements OnInit {
    hide = true;
    changePasswordForm: FormGroup;

    constructor(private dialogRef: MatDialogRef<ChangePasswordDialogBoxComponent>,
                @Inject(MAT_DIALOG_DATA) public data ) {
    }

    ngOnInit(): void {
    }

    onChangePassword() {
    }
}
