import {DangerLevel, DangerType} from './types';

export default class Incident {
  constructor(
    public type: DangerType,
    public level: DangerLevel,
    public numberOfReports: number,
    public timestamp: number,
    public beenNotified: boolean,
    public over: boolean,
    public range: number,
    public location: {type: 'Point'; coordinates: Array<number>},
  ) {}
}
