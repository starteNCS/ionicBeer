import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NumberValueAccessor, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-beer',
  templateUrl: './create-beer.page.html',
  styleUrls: ['./create-beer.page.scss'],
})
export class CreateBeerPage implements OnInit {

  private formGroup: FormGroup;
  private type: number;
  private manufacturer: string;
  private name: string;

  constructor(private readonly builder: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.builder.group({
      type: [this.type, Validators.required],
      manufacturer: [this.manufacturer, Validators.required],
      name: [this.name, Validators.required]
    });
  }

}
