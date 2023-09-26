import { DangerLevel } from "../../src/utils/Types";

export default class User {
  constructor(
    public number: string,
    public location: {type: 'Point'; coordinates: Array<number>},
  ) {}
}
