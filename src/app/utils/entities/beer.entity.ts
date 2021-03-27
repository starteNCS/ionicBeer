import { TypeEntity } from './type.entity';
import { DocumentReference } from "@angular/fire/firestore";

export interface BeerEntity {
    manufracturer: string;
    name: string;
    type: DocumentReference<TypeEntity>;
}