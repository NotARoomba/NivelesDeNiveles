import * as mongoDB from 'mongodb';
import { Server, Socket } from 'socket.io';
import * as dotenv from 'ts-dotenv';
import Sensor from '../models/sensor';
import NivelesEvents from '../models/events';
import { DangerLevel } from '../../src/utils/Types';
import Incident from '../models/incident';

const env = dotenv.load({
  MONGODB: String,
  USER_DATABASE: String,
  USER_COLLECTION: String,
  INFO_DATABASE: String,
  SENSOR_COLLECTION: String,
  REPORT_COLLECTION: String,
  INCIDENT_COLLECTION: String,
});

export const collections: {
  users?: mongoDB.Collection;
  sensors?: mongoDB.Collection;
  incidents?: mongoDB.Collection;
  reports?: mongoDB.Collection;
} = {};

// RANGE OF INCIDENTS
// (# of reports * 250) + 500)

function getRange(n: number) {
  return (n*250) + 500;
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

  collections.incidents = incidentsCollection

  console.log('Successfully connected to database!');
    //check if there is incident and if not then make an incident
  sensorsCollection.watch().on('change', async (next) => {
    // let sensors: Sensor[] = (await sensorsCollection.find({}).toArray() as unknown as Sensor[])
    if (next.operationType == 'update') {
      let updatedSensor = next.fullDocument?.updatedFields as Sensor
      let beforeSensor = next.fullDocumentBeforeChange?.updatedFields as Sensor
      console.log(updatedSensor)
        //from inistal safe state to other danger states
        if (updatedSensor.status > DangerLevel.SAFE && beforeSensor.status === DangerLevel.SAFE) {
          //need to find an existing incident (user report) or make a new incident
          const incidentsNear: Incident[] = (await incidentsCollection.find({
              location: {
                $near: {
                  $geometry: {
                    type: 'Point',
                    coordinates: updatedSensor.location,
                  },
                  $maxDistance: 2000,
                },
              }, 
              type: updatedSensor.type,
            })
            .toArray()) as unknown as Incident[];
            //make a new incident
            if (incidentsNear.length === 0) {
              await incidentsCollection.insertOne(new Incident(updatedSensor.type, updatedSensor.status, 3, Date.now(), false, false, getRange(3), updatedSensor.location))
            }
            for (let incident of incidentsNear) { 
              //then check if the incident inferior and then update the incident
              if (incident.level !== updatedSensor.status) {
                await incidentsCollection.updateOne({location: incident.location}, {level: updatedSensor.status})
              } else {
                await incidentsCollection.updateOne({location: incident.location}, { $inc: { numberOfReports: 3 } })
              } 
            }
        }
      }
    })
    // also check when a report has been created and then check for a prevoius incident and then update the numebr of reports as needed
    // also need to check if the report has expired every so and so hours and then delete t so that the only report tat are there are th ones that are currently ging on
}
