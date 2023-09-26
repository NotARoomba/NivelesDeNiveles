export default class Sensor {
  constructor(
    public name: string,
    public status: Number,
    public location: {type: 'Point'; coordinates: Array<number>},
  ) {}
}
