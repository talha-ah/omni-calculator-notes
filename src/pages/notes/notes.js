import { useState, useContext, useEffect } from "react"
import { useHistory } from "react-router"

import Context from "../../context/notes"

import { Note } from "../../components/notes/notes"
import { Heading } from "../../components/heading/heading"
import { Form, FormItem } from "../../components/form/form"
import { Page, PageContent } from "../../components/page/page"
import { BorderedButton, ButtonContainer } from "../../components/button/button"

function Notes() {
  const history = useHistory()
  const context = useContext(Context)

  const [notes, setNotes] = useState([])
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    setNotes(context.notes)
  }, [context.notes])

  const addNote = async (e) => {
    e.preventDefault()
    setActionLoading(true)

    let value = e.target.textarea.value
    let notesArray = [
      {
        text: value,
        date: Date.now(),
        id: notes.length + 1,
      },
      ...notes,
    ]

    context.setNotes(notesArray)
    e.target.reset()

    setActionLoading(false)
  }

  const deleteNote = async (id) => {
    setActionLoading(true)

    context.setNotes(notes.filter((e) => e.id !== id))

    setActionLoading(false)
  }

  return (
    <Page>
      <Form onSubmit={addNote}>
        <FormItem
          required
          label="Note"
          name="textarea"
          placeholder="Note text"
        />
        <ButtonContainer>
          <BorderedButton
            type="submit"
            text={actionLoading ? "Loading..." : "Add note"}
          />
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
              key={n.id}
              text={n.text}
              date={n.date}
              onDeleteClick={() => deleteNote(n.id)}
              onDateClick={() => history.push(`/${n.id}`)}
            />
          ))
        )}
      </PageContent>
    </Page>
  )
}

export default Notes
