import { Beer } from './../../../../../store/actions/beer.actions';
import { Observable } from 'rxjs';
import { TypeEntity } from './../../../../../utils/entities/type.entity';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-beer-card',
  templateUrl: './beer-card.component.html',
  styleUrls: ['./beer-card.component.scss'],
})
export class BeerCardComponent implements OnInit {

  @Input() beerId: string;
  @Input() manufacturer: string;
  @Input() name: string;
  @Input() type: string;
  @Input() hasOwnRating: boolean;
  @Input() rating: number;
  @Input() average: number;

  @Output() rated = new EventEmitter<void>();

  public typeString: Observable<TypeEntity>;

  constructor(
    private readonly store: Store,
    private readonly firestore: AngularFirestore,
    private readonly alertController: AlertController) { }

  async ngOnInit() {
    const typeRef = this.firestore.collection<TypeEntity>('types').doc(this.type);
    this.typeString = typeRef.valueChanges();
  }

  async rate(): Promise<void> {
    const alert = await this.alertController.create({
      header: `${this.manufacturer} ${this.name} bewerten`,
      message: 'Mit einer Zahl zwischen 0 und 10 bewerten',
      backdropDismiss: true,
      inputs: [
        {
          name: 'rating',
          type: 'number',
          min: 0,
          max: 10,
          placeholder: 'Bewertung'
        }
      ],
      buttons: [
        {
          text: 'Speichern',
          handler: (alertData) => {
            this.store.dispatch(new Beer.Rate(this.beerId, alertData.rating));
            this.rated.emit();
          }
        }
      ]
    });

    await alert.present();
  }

}
