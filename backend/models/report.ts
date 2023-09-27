import {DangerLevel, DangerType} from './types';

export default class Report {
  constructor(
    public reporter: string,
    public type: DangerType,
    public level: DangerLevel,
    public timestamp: number,
    public image: string,
    public location: {type: 'Point'; coordinates: Array<number>},
  ) {}
}
