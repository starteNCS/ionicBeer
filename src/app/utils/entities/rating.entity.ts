import { DocumentReference } from '@angular/fire/firestore';
import { BeerEntity } from './beer.entity';

export interface RatingEntity {
    user: string;
    beer: DocumentReference<BeerEntity>;
    ratedAt: unknown; // since i havent found an object to represent the firestore timestamp
    rating: number;
}