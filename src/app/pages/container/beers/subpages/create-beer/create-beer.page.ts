import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { BeerState } from './../../../../../store/beer.state';
import firebase from 'firebase';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Beer } from 'src/app/store/actions/beer.actions';

@Component({
  selector: 'app-create-beer',
  templateUrl: './create-beer.page.html',
  styleUrls: ['./create-beer.page.scss'],
})
export class CreateBeerPage implements OnInit, OnDestroy {

  @Select(BeerState.loading) loading$: Observable<boolean>;

  private destroy$ = new Subject<void>();
  private beer = {
    type: '',
    manufacturer: '',
    name: '',
  };

  public formGroup: FormGroup;
  public types: string[];

  constructor(
    private readonly builder: FormBuilder,
    private readonly store: Store) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async ngOnInit() {
    this.formGroup = this.builder.group({
      type: [this.beer.type, [Validators.required]],
      manufacturer: [this.beer.manufacturer, [Validators.required]],
      name: [this.beer.name, [Validators.required]]
    });

    this.loading$.pipe(takeUntil(this.destroy$)).subscribe((loading: boolean) => {
      if(loading) {
        this.formGroup.disable();
      }else{
        this.formGroup.enable();
      }
    })

    await this.getTypes();
  }

  save(): void {
    debugger;
    if(this.formGroup.invalid){
      this.formGroup.markAllAsTouched();
      return;
    }
    
    this.store.dispatch(new Beer.Create(this.type.value, this.manufacturer.value, this.name.value));
  }

  async getTypes(): Promise<void> {
    const typesSnapshot = await firebase.database().ref('beers/types').get();
    this.types = typesSnapshot.val();
  }

  get type(): AbstractControl {
    return this.formGroup.get('type');
  }

  get manufacturer(): AbstractControl {
    return this.formGroup.get('manufacturer');
  }

  get name(): AbstractControl {
    return this.formGroup.get('name');
  }

}
