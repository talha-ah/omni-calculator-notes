import { gql } from "@apollo/client"

export const createNoteGQL = gql`
  mutation CreateNoteMutation($text: String) {
    createNote(text: $text) {
      _id
      text
      date
    }
  }
`

export const deleteNoteGQL = gql`
  mutation DeleteNoteMutation($id: ID) {
    deleteNote(id: $id) {
      _id
      text
      date
    }
  }
`
