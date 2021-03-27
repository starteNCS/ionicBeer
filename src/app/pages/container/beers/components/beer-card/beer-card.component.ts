import { Observable } from 'rxjs';
import { TypeEntity } from './../../../../../utils/entities/type.entity';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-beer-card',
  templateUrl: './beer-card.component.html',
  styleUrls: ['./beer-card.component.scss'],
})
export class BeerCardComponent implements OnInit {

  @Input() manufacturer: string;
  @Input() name: string;
  @Input() type: string;
  @Input() hasOwnRating: boolean;
  @Input() rating: number;
  @Input() average: number;

  public typeString: Observable<TypeEntity>;

  constructor(
    private readonly fireDatabase: AngularFireDatabase,
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
      inputs: [
        {
          name: 'Bewertung',
          type: 'number',
          min: 0,
          max: 10
        }
      ],
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Speichern',
          handler: () => {

          }
        }
      ]
    });

    await alert.present();
  }

}
