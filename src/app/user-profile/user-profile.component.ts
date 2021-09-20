import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public form: FormGroup;

  constructor(public fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      ctrlcompany: [null, [Validators.required]],
      ctrluserName: [null, [Validators.required]],
      ctrlemail: [null, [Validators.required]],
      ctrlfirstName: [null, [Validators.required]],
      ctrllastName: [null, [Validators.required]],
      ctrladdress: [null, [Validators.required]],
      ctrlcity: [null, [Validators.required]],
      ctrlcountry: [null, [Validators.required]],
      ctrlpostalCode: [null, [Validators.required]],
    });
  }

  onEditProfile(): void {
  }
}
