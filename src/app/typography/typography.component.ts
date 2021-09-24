import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../shared/Services/login.service';
import { SharePointService } from '../shared/Services/share-point.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
  rows = [];

  public form: FormGroup;
  public form2: FormGroup;

  public role: any;
  public userId: any;
  public spFile: any;
  public docLink: any;
  AttachedFile: any;
  AttchFile;

  constructor(public fb: FormBuilder, private toastr: ToastrService, public loginService: LoginService, public sharepointService: SharePointService) {
    this.form = this.fb.group({
      ctrltopic: [null, [Validators.required]],
      ctrlrole: [null, [Validators.required]],
      ctrlabstract: [null, [Validators.required]],
      ctrlattachedfile: [null, [Validators.required]]
    });

    this.form2 = this.fb.group({
      ctrltopic: [null, [Validators.required]],
      ctrlrole: [null, [Validators.required]],
      ctrlabstract: [null, [Validators.required]],
      ctrlattachedfile: [null, [Validators.required]]
    });

    this.role = localStorage.getItem('UserRole');
    this.userId = localStorage.getItem('UserId');
  }

  ngOnInit() {
    this.fetchUserRoles();
  }

  fetchUserRoles() {
    this.loginService.getAllUserRoles()
      .subscribe(success => {
        if (success !== null) {
          this.rows = this.loginService.userRoles;
        }
      });
  }

  // onFileChange(event) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target; //.files[0];
  //     this.AttachedFile = event.target.files[0];
  //     this.spFile = file;
  //   } else {
  //     this.spFile = null;
  //   }
  //   // console.log(this.spFile);
  // }

  onChange(event) {
    this.spFile = event.target.files[0];
  }

  public onSubmit(value: any): void {
    // this.formData = value;
    // console.log('data1', value);
    this.sharepointService.upload(this.spFile).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {
          this.docLink = event.link;
          this.FileUploadSuccess();
          // console.log("Link: " + this.docLink);
          value.ctrlattachedfile = this.docLink;
          this.ShareData(value);
        } else {
          this.FileUploadFailed();
        }
      }
    );
  }

  selectInput(event) {
    // console.log("Data: " + event);
  }

  FileUploadFailed() {
    this.toastr.error('File Upload Fail', 'Fail');
    this.toastr.error('File Sharing Failed. Try again!', 'Fail');
  }

  FileUploadSuccess() {
    this.toastr.success('File Uploaded', 'Success');
  }

  openSnackBarfailed() {
    this.toastr.error('File Sharing Failed. Try again!', 'Fail');
  }

  openSnackBarSuccess() {
    this.toastr.success('File Sharing Success', 'Success');
  }

  public ShareData(value: any): void {
    // console.log('data 2', value);
    this.sharepointService.addnewsharedata(value, this.userId).subscribe((data: any) => {

      console.log("MSG: ", data.ReturnMsg)
      if (data.ReturnMsg == "Document created successfully") {
        this.openSnackBarSuccess();
        this.form.reset();
        this.form2.reset();
      } else {
        this.openSnackBarfailed();
        this.form.reset();
        this.form2.reset();
      }
    }, (err: HttpErrorResponse) => {
      this.openSnackBarfailed();
      this.form.reset();
    });
  }

}
