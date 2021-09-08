const types = `
  type Query {
    notes: [Note]
    note(id: ID): Note
  }

  type Mutation {
    createNote(text: String): Note
    deleteNote(id: ID): Note
  }

  type Note {
    _id: ID
    text: String
    date: Float
  }
`

module.exports = types
