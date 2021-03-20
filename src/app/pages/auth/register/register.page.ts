import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngxs/store';
import { User } from 'src/app/store/actions/user.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public user = {
    name: '',
    email: '',
    password: ''
  };
  formGroup: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly firebaseAuth: AngularFireAuth,
    private readonly store: Store) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, [Validators.required]]
    })
  }

  register(): void {
    if(this.formGroup.invalid){
      this.formGroup.markAllAsTouched();
      return;
    }

    this.firebaseAuth
      .createUserWithEmailAndPassword(this.email.value, this.password.value)
      .then((response: firebase.default.auth.UserCredential) => {
        
      }, (error) => {
        this.store.dispatch(new User.RegisterFail("Die Kombination aus E-Mail und Passwort existiert nicht."));
      });
  }

  get name(): AbstractControl {
    return this.formGroup.get('name');
  }

  get email(): AbstractControl {
    return this.formGroup.get('email');
  }

  get password(): AbstractControl {
    return this.formGroup.get('password');
  }

}
