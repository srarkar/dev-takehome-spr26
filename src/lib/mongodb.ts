import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Please add your MONGODB_URI to .env.local");

const globalForMongo = globalThis as {
  _mongoClientPromise?: Promise<MongoClient>;
};

const clientPromise =
  globalForMongo._mongoClientPromise ??= new MongoClient(uri).connect();

export default clientPromise;
