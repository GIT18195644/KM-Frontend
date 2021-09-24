import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';


@Component({
    selector: 'app-edit-file-dialog-box',
    templateUrl: './edit-file.component.html',
    styleUrls: ['./edit-file.component.css']
})
export class EditFileComponent implements OnInit {
    pageSize: any;
    rowCount: any;
    curPage: any;
    public rows = [];
    editFileForm: FormGroup;

    constructor(private dialogRef: MatDialogRef<EditFileComponent>,
                @Inject(MAT_DIALOG_DATA) public data ) {
    }

    ngOnInit(): void {
    }

    onUpdateFile() {
    }

    onEditFile() {
    }
}
