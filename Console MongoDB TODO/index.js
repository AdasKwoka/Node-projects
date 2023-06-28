const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const login = process.env.USER_LOGIN;
const pass = process.env.USER_PASSWORD;

const uri = `mongodb+srv://${login}:${pass}@cluster36998.cuipj9e.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const run = async () =>{
  try {
    await client.connect();
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
