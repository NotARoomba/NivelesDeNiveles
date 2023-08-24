export default class User {
  constructor(
    public name: string,
    public number: string,
    public location: {type: 'Point'; coordinates: Array<Number>},
  ) {}
}
