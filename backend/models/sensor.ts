import {DangerLevel, DangerType} from './types';

export default class Sensor {
  constructor(
    public name: string,
    public status: DangerLevel,
    public type: DangerType,
    public location: {type: 'Point'; coordinates: Array<number>},
  ) {}
}
