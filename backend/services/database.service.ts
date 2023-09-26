import * as mongoDB from 'mongodb';
import * as dotenv from 'ts-dotenv';

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

export async function connectToDatabase() {
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
}
