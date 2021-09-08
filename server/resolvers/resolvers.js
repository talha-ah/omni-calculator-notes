const NotesModel = require("../models/note")

const resolvers = {
  Query: {
    notes: async () => {
      return await NotesModel.find().lean()
    },
    note: async (parent, { id }) => {
      return await NotesModel.findById(id).lean()
    },
  },
  Mutation: {
    createNote: async (parent, { text }) => {
      return await NotesModel.create({ text })
    },
    deleteNote: async (parent, { id }) => {
      return await NotesModel.findByIdAndDelete(id)
    },
  },
}

module.exports = resolvers
