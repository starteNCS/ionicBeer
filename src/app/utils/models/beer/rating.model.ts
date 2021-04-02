import { BeerEntity } from "../../entities/beer.entity";

export class RatingModel {
    beer: BeerEntity;
    ratedAt: any;
    rating: number;
}