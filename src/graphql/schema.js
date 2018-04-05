const { getStacks, getStack, addStack, addNoteToStack } = require("./db/stack")

const schema = `

type Card {
    _id: ID!
    content: String!
}

type Stack {
    _id: ID!
    name(stackName:String = "New Stack"): String
    cards: [Card]
}

type Query {
    hello: String,
    stack(_id:String): Stack,
    stacks: [Stack],
}

type Mutation {
    addStack(stackName:String):Stack,
    addNoteToStack(_id:String, note:String):Stack
}

`

const resolvers = {
  Query: {
    stacks: async () => await getStacks(),
    stack: async (root, { _id }) => await getStack(_id)
  },
  Mutation: {
    addStack: async (root, { stackName }) => {
      const inserted = await addStack(stackName)
      return await getStack(inserted.insertedId.toString())
    },
    addNoteToStack: async (root, { _id, note }) => {
      await addNoteToStack(_id, note)
      return await getStack(_id)
    }
  }
}

module.exports = {
  schema,
  resolvers
}
