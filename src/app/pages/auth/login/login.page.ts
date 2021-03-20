import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user = {
    email: '',
    password: ''
  };
  formGroup: FormGroup;

  constructor(private readonly formBuilder: FormBuilder,
    private readonly firebaseAuth: AngularFireAuth) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, [Validators.required]]
    })
  }

  login(): void {
    if(this.formGroup.invalid){
      this.formGroup.markAllAsTouched();
      return;
    }

    this.firebaseAuth
      .signInWithEmailAndPassword(this.email.value, this.password.value)
      .then((response: firebase.default.auth.UserCredential) => {
        
      }, (error) => {

      });
  }

  get email(): AbstractControl {
    return this.formGroup.get('email');
  }

  get password(): AbstractControl {
    return this.formGroup.get('password');
  }

}
