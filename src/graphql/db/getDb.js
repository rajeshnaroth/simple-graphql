const { MongoClient } = require("mongodb")
const { requiredArg } = require("../../util/requiredArg")

const connectionUrl = process.env.DB_URL
const dbName = process.env.DB_NAME

async function getDb() {
  //console.log(process.env, connectionUrl)
  const connection = await MongoClient.connect(connectionUrl)
  return connection.db(dbName)
}

async function getCollection(collectionName = requiredArg()) {
  const db = await getDb()
  return await db.collection(collectionName)
}

module.exports = {
  connectionUrl,
  dbName,
  getDb,
  getCollection
}
