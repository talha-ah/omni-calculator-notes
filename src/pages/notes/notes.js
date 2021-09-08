import { useState, useContext, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { useHistory } from "react-router"

import Context from "../../context/notes"

import { deleteNoteGQL, createNoteGQL } from "../../apollo/mutations"

import { Note } from "../../components/notes/notes"
import { Heading } from "../../components/heading/heading"
import { Form, FormItem } from "../../components/form/form"
import { Page, PageContent } from "../../components/page/page"
import { BorderedButton, ButtonContainer } from "../../components/button/button"

function Notes() {
  const history = useHistory()
  const context = useContext(Context)

  const [notes, setNotes] = useState([])
  const [noteId, setNoteId] = useState(null)

  const [addNoteMutation, { data: addData, loading: addLoading }] =
    useMutation(createNoteGQL)
  const [deleteNoteMutation, { data: deleteData, loading: deleteLoading }] =
    useMutation(deleteNoteGQL)

  useEffect(() => {
    setNotes(context.notes)
  }, [context.notes])

  const preAddNote = async (e) => {
    e.preventDefault()
    addNoteMutation({ variables: { text: e.target.textarea.value } })
  }

  useEffect(() => {
    !addLoading && addData && postAddNote()
    // eslint-disable-next-line
  }, [addLoading])

  const postAddNote = async (e) => {
    context.setNotes([addData.createNote, ...notes])
    document.getElementById("noteform").reset()
  }

  useEffect(() => {
    !deleteLoading && deleteData && deleteNote()
    // eslint-disable-next-line
  }, [deleteLoading])

  const deleteNote = () => {
    context.setNotes(notes.filter((e) => String(e._id) !== String(noteId)))
    setNoteId(null)
  }

  return (
    <Page>
      <Form id="noteform" onSubmit={preAddNote}>
        <FormItem
          required
          label="Note"
          name="textarea"
          placeholder="Note text"
        />
        <ButtonContainer>
          <BorderedButton type="submit" text="Add note" loading={addLoading} />
        </ButtonContainer>
      </Form>
      <PageContent>
        <Heading
          elem="h2"
          text="Latest notes"
          style={{
            marginTop: 0,
            textAlign: "center",
            marginBottom: "1.4em",
          }}
        />
        {notes.length === 0 ? (
          <Heading
            elem="h5"
            text="Create a new note to show here"
            style={{
              textAlign: "center",
              fontWeight: "normal",
            }}
          />
        ) : (
          notes.map((n) => (
            <Note
              key={n._id}
              _id={n._id}
              text={n.text}
              date={n.date}
              deleting={noteId}
              deleteLoading={deleteLoading}
              onDateClick={() => history.push(`/${n._id}`)}
              onDeleteClick={() => {
                setNoteId(n._id)
                deleteNoteMutation({ variables: { id: n._id } })
              }}
            />
          ))
        )}
      </PageContent>
    </Page>
  )
}

export default Notes
