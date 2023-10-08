import Report from '../models/report';
import {collections} from './database.service';
import Sensor from '../models/sensor';
import Incident from '../models/incident';
import { DangerLevel } from '../models/types';

export default async function prune() {
  // loop through all the sensors and check for any anomalies, adding each one to an incident that is close to the sensor OR make a new incident if there is no previous incident nearby, the number of reports (weight) should be a few times greater thena the users
  // then loop through all the reports and also add on to the incidents like the sensors, checking if there is a current incident or making a new one and adding on to the number of reports
  // finally for all the instances get the users that are within certain ranges of the center and emit a new locationData to the clients with the new sensor values
  /// the sensors should be on a websocket or polling every so ans so seconds to the server so that the server can use webhooks to mongo to check for the state changes
  // if the state changes for a sensor then a new incident is created, same for the ports and the webhooks connecting to mongodb
  // this function should move to webhooks or whenever a new incident is created it sends a warning to all the users nearby
  // TODO: repurpouse function to sendIncidents where takes in a socket and then gets all the incidents and for each user it emits a message to the user depending on the level of the incident or if it has changed

  // GREATER THAN 2 HOURS WILL BE MARKED AS OVER AND NOT PROCESSED ANYMORE
  // IF AND ONlY IF THERE ARE NO SENSORS NEARBY THAT SAY OTHERWISE
  const activeReports = (await collections.reports?.find(
    { timestamp: { $lt: Date.now() - (1000 * 3600 * 2) } })) as unknown as Report[];
    console.log(activeReports)
  for (let report of activeReports) {
    const sensorsNearby: Sensor[] = (await collections.sensors
      ?.find({
        location: {
          $near: {
            $geometry: {...report.location},
            $maxDistance: 2000,
          },
        },
        over: false,
        type: report.type,
      })
      .toArray()) as unknown as Sensor[];
      if (sensorsNearby.length !== 0) {
        await collections.reports?.updateOne({location: report.location}, {$set: {timestamp: Date.now()}})
      }
  }
  // INCIDENTS
  // for every incident get the sensor that is within range of the incident and if it is of the same type then set the incident to the current date.now
  const activeIncidents =  (await collections.incidents?.find(
    { timestamp: { $lt: Date.now() - (1000 * 3600 * 2) } })) as unknown as Incident[];
    for (let incident of activeIncidents) {
      const sensorsNearby: Sensor[] = (await collections.sensors
        ?.find({
          location: {
            $near: {
              $geometry: {...incident.location},
              $maxDistance: incident.range,
            },
          },
          over: false,
          type: incident.type,
        })
        .toArray()) as unknown as Sensor[];
      if (sensorsNearby.length !== 0) {
        for (let sensor of sensorsNearby) {
          //check for if the sensors havent updated in a while
          if (sensor.status !== DangerLevel.SAFE) {
            await collections.incidents?.updateOne({location: incident.location}, {$set: {timestamp: Date.now()}})
          }
        }
      }
    }
  // need to get all the sensors within a certain radius and if the report matches the type of sensor then set the active report timespamp to now
    //then set over the ones not updated
    await collections.reports?.updateMany(
      {timestamp: {$lt: Date.now() - (1000 * 3600 * 2)}},
      {$set: {over: true}},
    );
  await collections.incidents?.updateMany(
    {timestamp: {$lt: Date.now() - (1000 * 3600 * 2)}},
    {$set: {over: true}},
  );
}

