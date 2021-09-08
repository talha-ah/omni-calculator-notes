import { useParams, useHistory } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import styles from "./note.module.css"

import Context from "../../context/notes"

import { Loader } from "../../components/loader/loader"
import { NoteSingle } from "../../components/notes/notes"
import { Page, PageContent } from "../../components/page/page"
import { Button, DangerButton } from "../../components/button/button"

function Note() {
  const { id } = useParams()
  const history = useHistory()
  const context = useContext(Context)

  const [note, setNote] = useState("")
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    fetchNote()
    // eslint-disable-next-line
  }, [])

  const fetchNote = async () => {
    setNote(context.notes.find((e) => String(e.id) === String(id)))
    setLoading(false)
  }

  const deleteNote = async () => {
    setActionLoading(true)
    context.setNotes(context.notes.filter((e) => String(e.id) !== String(id)))

    setActionLoading(false)
    history.goBack()
  }

  return (
    <Page>
      <PageContent>
        <div className={styles.buttonRow}>
          <Button text="Go back" onClick={() => history.goBack()} />
          <DangerButton
            text="Delete note"
            onClick={deleteNote}
            loading={actionLoading}
          />
        </div>
        {loading ? (
          <Loader />
        ) : (
          <NoteSingle text={note.text} date={note.date} />
        )}
      </PageContent>
    </Page>
  )
}

export default Note
