import { useParams, useHistory } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { useQuery, useMutation } from "@apollo/client"

import Context from "../../context/notes"
import styles from "./note.module.css"

import { fetchNoteGQL } from "../../apollo/queries"
import { deleteNoteGQL } from "../../apollo/mutations"

import { Loader } from "../../components/loader/loader"
import { NoteSingle } from "../../components/notes/notes"
import { Page, PageContent } from "../../components/page/page"
import { Button, DangerButton } from "../../components/button/button"

function Note() {
  const { id } = useParams()
  const history = useHistory()
  const context = useContext(Context)

  const [note, setNote] = useState("")

  const { data: noteData, loading: noteLoading } = useQuery(fetchNoteGQL, {
    variables: { id },
  })
  const [deleteNote, { data: deleteData, loading: deleteLoading }] =
    useMutation(deleteNoteGQL)

  useEffect(() => {
    !noteLoading && noteData && setNote({ ...noteData.note })
    // eslint-disable-next-line
  }, [noteLoading])

  useEffect(() => {
    !deleteLoading && deleteData && postDeleteNote()
    // eslint-disable-next-line
  }, [deleteLoading])

  const postDeleteNote = () => {
    context.setNotes(context.notes.filter((e) => String(e._id) !== String(id)))

    history.goBack()
  }

  return (
    <Page>
      <PageContent>
        <div className={styles.buttonRow}>
          <Button text="Go back" onClick={() => history.goBack()} />
          <DangerButton
            text="Delete note"
            loading={deleteLoading}
            onClick={() => deleteNote({ variables: { id } })}
          />
        </div>
        {noteLoading ? (
          <Loader />
        ) : (
          <NoteSingle text={note.text} date={note.date} />
        )}
      </PageContent>
    </Page>
  )
}

export default Note
