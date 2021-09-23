import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'app-change-password-dialog-box',
    templateUrl: './change-password-dialog-box.component.html',
    styleUrls: ['./change-password-dialog-box.component.css']
})
export class ChangePasswordDialogBoxComponent implements OnInit {
    hide = true;
    public userId: any;
    public changePasswordForm: FormGroup;

    constructor(private dialogRef: MatDialogRef<ChangePasswordDialogBoxComponent>,
        @Inject(MAT_DIALOG_DATA) public data, public fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.changePasswordForm = this.fb.group({
            ctrlpwd: [null, [Validators.required]],
            ctrlconpwd: [null, [Validators.required]]
        });

        this.userId = localStorage.getItem('UserId');
    }

    public onSubmit(value: any): void {
        
    }
}
