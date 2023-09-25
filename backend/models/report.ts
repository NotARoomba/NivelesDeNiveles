import {DangerLevel, DangerType} from '../../src/utils/Types';

export default class Report {
  constructor(
    public reporter: string,
    public type: DangerType,
    public level: DangerLevel,
    public timestamp: number,
    public location: {type: 'Point'; coordinates: Array<Number>},
  ) {}
}
