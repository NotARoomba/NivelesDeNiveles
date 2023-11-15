import * as mongoDB from 'mongodb';
import {Server, Socket} from 'socket.io';
import * as dotenv from 'ts-dotenv';
import Sensor from '../models/sensor';
import {DangerLevel, DangerType} from '../models/types';
import Incident from '../models/incident';
import Report from '../models/report';
import NivelesEvents from '../models/events';
import haversine from 'haversine-distance';
import * as OneSignal from 'onesignal-node';
import User from '../models/user';
import { CreateNotificationBody } from 'onesignal-node/lib/types';

const env = dotenv.load({
  MONGODB: String,
  USER_DATABASE: String,
  USER_COLLECTION: String,
  INFO_DATABASE: String,
  SENSOR_COLLECTION: String,
  REPORT_COLLECTION: String,
  INCIDENT_COLLECTION: String,
  AI_AUTH: String,
  ONESIGNAL_APP_ID: String,
  ONESIGNAL_API_KEY: String,
});

const onesignal = new OneSignal.Client(
  env.ONESIGNAL_APP_ID,
  env.ONESIGNAL_API_KEY,
);

export const collections: {
  users?: mongoDB.Collection;
  sensors?: mongoDB.Collection;
  incidents?: mongoDB.Collection;
  reports?: mongoDB.Collection;
} = {};

// RANGE OF INCIDENTS
// (# of reports * 250) + 500)

function getRange(n: number) {
  return n * 500 + 250;
}

function getLevel(n: number) {
  return n < 3
    ? DangerLevel.SAFE
    : n < 6
    ? DangerLevel.RISK
    : DangerLevel.DANGER;
}

export async function connectToDatabase(io: Server) {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(env.MONGODB);
  await client.connect();

  const userDB: mongoDB.Db = client.db(env.USER_DATABASE);

  const usersCollection: mongoDB.Collection = userDB.collection(
    env.USER_COLLECTION,
  );
  collections.users = usersCollection;

  const infoDB: mongoDB.Db = client.db(env.INFO_DATABASE);

  const sensorsCollection: mongoDB.Collection = infoDB.collection(
    env.SENSOR_COLLECTION,
  );
  collections.sensors = sensorsCollection;

  const reportsCollection: mongoDB.Collection = infoDB.collection(
    env.REPORT_COLLECTION,
  );
  collections.reports = reportsCollection;

  const incidentsCollection: mongoDB.Collection = infoDB.collection(
    env.INCIDENT_COLLECTION,
  );

  collections.incidents = incidentsCollection;

  incidentsCollection.createIndex({location: '2dsphere'});
  reportsCollection.createIndex({location: '2dsphere'});
  sensorsCollection.createIndex({location: '2dsphere'});
  usersCollection.createIndex({location: '2dsphere'});

  // infoDB.command( { collMod: env.SENSOR_COLLECTION, changeStreamPreAndPostImages: { enabled: true } } );

  console.log('Successfully connected to database!');
  //check if there is incident and if not then make an incident
  const pipeline = [
    {
      $match: {
        $or: [{operationType: 'insert'}, {operationType: 'update'}],
      },
    },
  ];
  sensorsCollection
    .watch(pipeline, {
      fullDocument: 'required',
      fullDocumentBeforeChange: 'required',
    })
    .on('change', async next => {
      // let sensors: Sensor[] = (await sensorsCollection.find({}).toArray() as unknown as Sensor[])
      if (next.operationType == 'update') {
        // console.log(next)
        let updatedSensor = next.fullDocument as Sensor;
        let beforeSensor = next.fullDocumentBeforeChange as Sensor;
        // console.log(updatedSensor);
        //from inistal safe state to other danger states or danger stat to safe state
        if (updatedSensor.status != beforeSensor.status) {
          //need to find an existing incident (user report) or make a new incident
          let incidents = (await collections.incidents
            ?.find({type: updatedSensor.type, over: false})
            .toArray()) as unknown as Incident[];
          incidents.filter(
            incident =>
              haversine(
                {
                  lat: updatedSensor.location.coordinates[1],
                  lon: updatedSensor.location.coordinates[0],
                },
                {
                  lat: incident.location.coordinates[1],
                  lon: incident.location.coordinates[0],
                },
              ) < incident.range,
          );
          // const incidentsNear: Incident[] = (await incidentsCollection
          //   .find({
          //     location: {
          //       $near: {
          //         $geometry: {...updatedSensor.location},
          //         $maxDistance: 2000,
          //       },
          //     },
          //     type: updatedSensor.type,
          //     over: false,
          //   })
          //   .toArray()) as unknown as Incident[];
          //make a new incident
          if (incidents.length === 0) {
            await incidentsCollection.insertOne(
              new Incident(
                updatedSensor.type,
                updatedSensor.status,
                1,
                Date.now(),
                false,
                false,
                getRange(3),
                updatedSensor.location,
              ),
            );
          }
          for (let incident of incidents) {
            //then check if the incident inferior and then update the incident
            if (incident.level !== updatedSensor.status) {
              await incidentsCollection.updateOne(
                {location: incident.location},
                {$set: {level: updatedSensor.status, timestamp: Date.now()}},
              );
            } else {
              await incidentsCollection.updateOne(
                {location: incident.location},
                {$inc: {numberOfReports: 1}, timestamp: Date.now()},
              );
            }
          }
        }
      }
    });
  // also check when a report has been created and then check for a prevoius incident and then update the numebr of reports as needed
  // also need to check if the report has expired every so and so hours and then delete t so that the only report tat are there are th ones that are currently ging on
  reportsCollection.watch().on('change', async next => {
    if (next.operationType == 'insert') {
      console.log('REPORT INSERTED');
      const report: Report = next.fullDocument as Report;
      // console.log(report);
      let incidents = (await collections.incidents
        ?.find({type: report.type, over: false})
        .toArray()) as unknown as Incident[];
      incidents.filter(
        incident =>
          haversine(
            {
              lat: report.location.coordinates[1],
              lon: report.location.coordinates[0],
            },
            {
              lat: incident.location.coordinates[1],
              lon: incident.location.coordinates[0],
            },
          ) < incident.range,
      );
      // const incidentsNear: Incident[] = (await incidentsCollection
      //   .find({
      //     location: {
      //       $near: {
      //         $geometry: {...report.location},
      //         $maxDistance: 2000,
      //       },
      //     },
      //     type: report.type,
      //     over: false,
      //   })
      //   .toArray()) as unknown as Incident[];
      if (incidents.length === 0) {
        await incidentsCollection.insertOne(
          new Incident(
            report.type,
            DangerLevel.SAFE,
            1,
            Date.now(),
            false,
            false,
            getRange(1),
            report.location,
          ),
        );
      }
      for (let incident of incidents) {
        // add oen to the report, note as the report does not change the status 'or level of the report as the sensors take priority/ are more trustworthy
        await incidentsCollection.updateOne(
          {location: incident.location},
          {$inc: {numberOfReports: 1}},
        );
      }
    }
  });
  incidentsCollection
    .watch(pipeline, {
      fullDocument: 'required',
      fullDocumentBeforeChange: 'required',
    })
    .on('change', async next => {
      // updates all the location data for all the users using a hacky hack
      //update range of incident and level
      // also check if 2 incidents overlap and if so then merge the incident with the total range and set the center to the center of both of the points
      if (
        next.operationType === 'update' &&
        next.updateDescription.updatedFields?.numberOfReports
      ) {
        let updatedIncident = next.fullDocument as Incident;
        let beforeIncident = next.fullDocumentBeforeChange as Incident;
        // console.log(next);
        await incidentsCollection.updateOne(
          {_id: next.documentKey._id},
          {
            $set: {
              range: getRange(updatedIncident.numberOfReports),
              level: getLevel(updatedIncident.numberOfReports),
            },
          },
        );
        // need to send a notification warning the users if they are in a risk zone, safe zone (from a danger zone), or a danger zone
        const currentLevel = getLevel(updatedIncident.numberOfReports);
        let notification: CreateNotificationBody = {
          contents: {
            en: `You are now in a ${
              currentLevel === DangerLevel.SAFE
                ? 'safe'
                : currentLevel === DangerLevel.RISK
                ? 'risk'
                : 'danger'
            } zone!`,
            es: `Ahora se encuentra en una zona ${
              currentLevel === DangerLevel.SAFE
                ? 'segura'
                : currentLevel === DangerLevel.RISK
                ? 'de riesgo'
                : 'de peligro'
            }!`,
            fr: `Vous êtes dans une zone de ${
              currentLevel === DangerLevel.SAFE
                ? 'sûr'
                : currentLevel === DangerLevel.RISK
                ? 'risque'
                : 'danger'
            }!`,
            'zh-Hans': `该地区的状态${
              currentLevel === DangerLevel.SAFE
                ? '安全'
                : currentLevel === DangerLevel.RISK
                ? '风险'
                : '危险'
            }!`,
          },
          headings: {
            en: `Niveles De Niveles`,
            es: `Niveles De Niveles`,
            fr: `Niveles De Niveles`,
            'zh-Hans': `Niveles De Niveles`,
          },
          external_id: '',
          // filters: [
          //   {
          //     field: 'location',
          //     radius: getRange(updatedIncident.numberOfReports),
          //     lat: updatedIncident.location.coordinates[1],
          //     long: updatedIncident.location.coordinates[0],
          //   },
          // ],
        };
        try {
          await onesignal.createNotification(notification);
          // console.log(response.body);
        } catch (e) {
          if (e instanceof OneSignal.HTTPError) {
            // When status code of HTTP response is not 2xx, HTTPError is thrown.
            console.log(e.statusCode);
            console.log(e.body);
          }
        }
        // need to check for all the users that once were in the danger zone to then notify them that they are now in a safe zone
        console.log(
          updatedIncident.numberOfReports,
          beforeIncident.numberOfReports,
        );
        if (updatedIncident.numberOfReports < beforeIncident.numberOfReports) {
          const outerUsers = (await collections.users
            ?.find({
              location: {
                $geoWithin: {
                  $centerSphere: [
                    updatedIncident.location.coordinates,
                    getRange(beforeIncident.numberOfReports) / 6378100,
                  ],
                },
              },
            })
            .toArray()) as unknown as User[];
          const innerUsers = (await collections.users
            ?.find({
              location: {
                $geoWithin: {
                  $centerSphere: [
                    updatedIncident.location.coordinates,
                    getRange(updatedIncident.numberOfReports) / 6378100,
                  ],
                },
              },
            })
            .toArray()) as unknown as User[];
          let users = outerUsers.filter(u => !innerUsers.includes(u));
          // need to check if there are any users in that radius and then
          for (let user of users) {
            notification.external_id = user.number;
            // notification.filters[0].radius = 5;
            // notification.filters[0].lat = user.location.coordinates[1];
            // notification.filters[0].long = user.location.coordinates[0];
            try {
              await onesignal.createNotification(notification);
              // const otherUsers = (await collections.users
              //   ?.find({
              //     location: {
              //       $geoWithin: {
              //         $centerSphere: [user.location.coordinates, 5 / 6378100],
              //       },
              //     },
              //   })
              //   .toArray()) as unknown as User[];
              // users = users.filter(u => !otherUsers.includes(u));
              // console.log(response.body);
            } catch (e) {
              if (e instanceof OneSignal.HTTPError) {
                // When status code of HTTP response is not 2xx, HTTPError is thrown.
                console.log(e.statusCode);
                console.log(e.body);
              }
            }
          }
        }
        // check for merges of inidents
        let incidents = (await collections.incidents
          ?.find({over: false})
          .toArray()) as unknown as Incident[];
        // console.log(incidents);
        if (incidents.length > 1) {
          for (let i = 0; i < incidents.length; i++) {
            for (let j = 0; j < incidents.length; i++) {
              // check if not the same
              if (i !== j) {
                // then check if the 2 incidents are the same type and if the distance between the centers are less than or equal to the sum of the ranges
                // if true then merge the incidents and change the center to the middle of the 2 incidents
                // finally delete the 2 child incidents and push the parent
                if (
                  incidents[i].type == incidents[j].type &&
                  haversine(
                    {
                      lat: incidents[i].location.coordinates[1],
                      lon: incidents[i].location.coordinates[0],
                    },
                    {
                      lat: incidents[j].location.coordinates[1],
                      lon: incidents[j].location.coordinates[0],
                    },
                  ) <=
                    incidents[i].range + incidents[j].range
                ) {
                  const newCenter = [
                    (incidents[i].location.coordinates[0] +
                      incidents[j].location.coordinates[0]) /
                      2,
                    (incidents[i].location.coordinates[1] +
                      incidents[j].location.coordinates[1]) /
                      2,
                  ];
                  const newIncident: Incident = new Incident(
                    incidents[i].type,
                    incidents[i].level + incidents[j].level,
                    incidents[i].numberOfReports + incidents[j].numberOfReports,
                    Date.now(),
                    false,
                    false,
                    incidents[i].range + incidents[j].range,
                    {type: 'Point', coordinates: newCenter},
                  );
                  await collections.incidents?.deleteMany({
                    $or: [
                      {location: incidents[i].location},
                      {location: incidents[j].location},
                    ],
                  });
                  await collections.incidents?.insertOne(newIncident);
                  return io.emit(NivelesEvents.UPDATE_LOCATION_DATA);
                }
              }
            }
          }
        }
      }
      io.emit(NivelesEvents.UPDATE_LOCATION_DATA);
    });
}
