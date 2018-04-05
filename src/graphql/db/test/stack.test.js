const {
  getStackCollection,
  addStack,
  getStack,
  getStacks,
  addNoteToStack,
  deleteStack
} = require("../stack")

test("get getStackCollection", async () => {
  const collection = await getStackCollection()
  expect(collection.insertOne).toExist
})

async function testRequiredArguments(fn) {
  try {
    await fn()
  } catch (message) {
    expect(true).toEqual(true)
  }
}

test("Stack functions - required arguments", async () => {
  expect.assertions(4)

  testRequiredArguments(getStack)
  testRequiredArguments(addStack)
  testRequiredArguments(deleteStack)
  testRequiredArguments(addNoteToStack)
})

test("Stack life cycle", async () => {
  expect.assertions(5)

  const inserted = await addStack("Brand New Stack")
  const id = inserted.insertedId

  expect(id).toBeDefined()

  const justInserted = await getStack(id)
  expect(justInserted._id).toEqual(id)

  await addNoteToStack(id, "Note 1")

  const justUpdated = await getStack(id)
  expect(justUpdated._id).toEqual(id)
  expect(justUpdated.cards.length).toEqual(1)

  await deleteStack(id)
  const justDeleted = await getStack(id)
  expect(justDeleted).toBeNull()
})

describe("Adding Notes", () => {
  let id = null
  beforeEach(async () => {
    const inserted = await addStack("Brand New Stack")
    id = inserted.insertedId
  })

  afterEach(async () => {
    await deleteStack(id)
  })

  test("Adding notes", async () => {
    expect.assertions(4)

    await addNoteToStack(id, "Note 1")
    await addNoteToStack(id, "Note 2")

    const justUpdated = await getStack(id)
    expect(justUpdated._id).toEqual(id)
    expect(justUpdated.cards.length).toEqual(2)
    expect(justUpdated.cards[0].content).toEqual("Note 1")
    expect(justUpdated.cards[1].content).toEqual("Note 2")
  })
})
