import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'negi-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })
  constructor(
    public af: AngularFireAuth,
    private fb: FormBuilder,
  ) { }
  ngOnInit(): void {
  }

}
