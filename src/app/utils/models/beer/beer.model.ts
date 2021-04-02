export class BeerModel {
    constructor(
        public id: string,
        public type: string,
        public manufracturer: string,
        public name: string,
        public rating?: number,
        public average?: number) { }
}