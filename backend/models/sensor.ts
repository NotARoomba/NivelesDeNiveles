import { DangerLevel, DangerType } from "../../src/utils/Types";

export default class Sensor {
  constructor(
    public name: string,
    public status: DangerLevel,
    public type: DangerType,
    public location: {type: 'Point'; coordinates: Array<number>},
  ) {}
}
