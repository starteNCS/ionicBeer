import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { User } from 'src/app/store/actions/user.actions';
import { UserState } from 'src/app/store/user.state';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  @Select(UserState.loading) loading$: Observable<boolean>;

  public user = {
    name: '',
    email: '',
    password: ''
  };
  formGroup: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store,
    private readonly router: Router) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, [Validators.required]]
    });

    this.loading$.pipe(takeUntil(this.destroy$)).subscribe((loading: boolean) => {
      if (loading) {
        this.formGroup.disable();
      } else {
        this.formGroup.enable();
      }
    });
  }

  register(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.store.dispatch(new User.Create(this.email.value as string, this.password.value, {
      name: this.name.value
    }));
  }

  navigateToLogin(): void {
    this.router.navigateByUrl('/login');
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
