export default class User {
  constructor(
    public number: string,
    public location: {type: 'Point'; coordinates: Array<Number>},
  ) {}
}
