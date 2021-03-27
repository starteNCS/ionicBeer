import { DocumentReference } from '@angular/fire/firestore';
import { BeerEntity } from './beer.entity';

export interface RatingEntity {
    user: string;
    beer: DocumentReference<BeerEntity>;
    ratedAt: Date;
    rating: number;
}