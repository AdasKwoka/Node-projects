const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const constants = require('./constants/constants');
require('dotenv').config();

const login = process.env.USER_LOGIN;
const pass = process.env.USER_PASSWORD;
const dbName = process.env.TABLE_NAME;
const [command, ...args] = process.argv.splice(2);

const uri = `mongodb+srv://${login}:${pass}@cluster36998.cuipj9e.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const addNewTodo = async (todosCollection, title) => {
  try {
    await todosCollection.insertOne({
      title,
      done: false,
    })
    console.log('Todo item added successfully!')
  } catch (error) {
    console.log('Error during todo add!', error);
  }
  
}

const runTodoOperations = async (todosCollection) => {
  switch(command) {
    case constants.commandsType.ADD: {
      await addNewTodo(todosCollection, args[0]);
      break;
    }
  }
}

const run = async () =>{
  try {
    await client.connect();

    const db = client.db(dbName);
    const todosCollection = db.collection('todos');

    await runTodoOperations(todosCollection)
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
