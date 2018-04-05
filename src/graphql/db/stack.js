const { ObjectId } = require("mongodb")
const { getCollection } = require("./getDb")
const { requiredArg } = require("../../util/requiredArg")

async function getStackCollection() {
  return await getCollection("stack")
}

async function addStack(name = requiredArg()) {
  return await (await getStackCollection()).insertOne({ name, cards: [] })
}

async function getStack(id = requiredArg()) {
  return await (await getStackCollection()).findOne({ _id: new ObjectId(id) })
}

async function getStacks() {
  return await (await getStackCollection()).find().toArray()
}

async function addNoteToStack(id = requiredArg(), note = "") {
  const filter = { _id: new ObjectId(id) }
  const change = {
    $push: {
      cards: {
        _id: ObjectId(),
        content: note
      }
    }
  }

  return await (await getStackCollection()).updateOne(filter, change)
}

async function deleteStack(id = requiredArg()) {
  return await (await getStackCollection()).deleteOne({
    _id: new ObjectId(id)
  })
}

module.exports = {
  getStackCollection,
  addStack,
  getStack,
  getStacks,
  addNoteToStack,
  deleteStack
}
