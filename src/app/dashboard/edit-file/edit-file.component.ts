import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


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

    public ID: any;
    public Topic: any;
    public Abstract: any;
    public Author: any;
    public Role: any;
    public Link: any;

    editFileForm: FormGroup;

    constructor(private dialogRef: MatDialogRef<EditFileComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService) {

    }

    ngOnInit(): void {
        this.ID = this.data.ID;
        this.Topic = this.data.Topic;
        this.Abstract = this.data.Abstract;
        this.Author = this.data.Author;
        this.Role = this.data.Role;
        this.Link = this.data.Link;
    }

    onUpdateFile() {
        this.dialogRef.close();
        this.toastr.success("Shared File: " + this.data.ID + " updated successfully", 'Success');
    }

    onEditFile() {

    }
}
