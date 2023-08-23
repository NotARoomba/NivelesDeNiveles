import * as mongoDB from 'mongodb';
import * as dotenv from 'ts-dotenv';

const env = dotenv.load({
  MONGODB: String,
  DATABASE: String,
  USER_COLLECTION: String,
  SENSOR_COLLECTION: String,
});

export const collections: {
  users?: mongoDB.Collection;
  sensors?: mongoDB.Collection;
} = {};

export async function connectToDatabase() {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(env.MONGODB);
  await client.connect();

  const database: mongoDB.Db = client.db(env.DATABASE);

  const usersCollection: mongoDB.Collection = database.collection(
    env.USER_COLLECTION,
  );
  collections.users = usersCollection;

  const sensorsCollection: mongoDB.Collection = database.collection(
    env.SENSOR_COLLECTION,
  );
  collections.sensors = sensorsCollection;

  console.log('Successfully connected to database!');
}
