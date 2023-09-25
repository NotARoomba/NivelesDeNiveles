import * as mongoDB from 'mongodb';
import * as dotenv from 'ts-dotenv';

const env = dotenv.load({
  MONGODB: String,
  USER_DATABASE: String,
  USER_COLLECTION: String,
  SENSOR_DATABASE: String,
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

export async function connectToDatabase() {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(env.MONGODB);
  await client.connect();

  const userDB: mongoDB.Db = client.db(env.USER_DATABASE);

  const usersCollection: mongoDB.Collection = userDB.collection(
    env.USER_COLLECTION,
  );
  collections.users = usersCollection;

  const sensorDB: mongoDB.Db = client.db(env.USER_DATABASE);

  const sensorsCollection: mongoDB.Collection = sensorDB.collection(
    env.SENSOR_COLLECTION,
  );
  collections.sensors = sensorsCollection;

  const reportsCollection: mongoDB.Collection = sensorDB.collection(
    env.REPORT_COLLECTION,
  );

  const incidentsCollection: mongoDB.Collection = sensorDB.collection(
    env.INCIDENT_COLLECTION,
  );

  console.log('Successfully connected to database!');
}
