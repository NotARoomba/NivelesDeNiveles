import {DangerLevel, DangerType} from '../../src/utils/Types';
import Sensor from './sensor';
import User from './user';

export default class Incident {
  constructor(
    public reporter: string,
    public type: DangerType,
    public level: DangerLevel,
    public numberOfReports: number,
    public startTimestamp: number,
    public beenNotified: boolean,
    public over: boolean,
    public reports: Array<User | Sensor>,
    public range: number,
    public location: {type: 'Point'; coordinates: Array<Number>},
  ) {}
}
