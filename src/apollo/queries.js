import { gql } from "@apollo/client"

export const fetchNotesGQL = gql`
  query fetchNotes {
    notes {
      _id
      text
      date
    }
  }
`

export const fetchNoteGQL = gql`
  query fetchNote($id: ID) {
    note(id: $id) {
      _id
      text
      date
    }
  }
`
