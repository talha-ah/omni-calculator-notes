import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import { useState, useEffect } from "react"

import Context from "./context/notes"

import Note from "./pages/note/note"
import Notes from "./pages/notes/notes"

import Header from "./components/header/header"
import { Loader } from "./components/loader/loader"

function App() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    let data = localStorage.getItem("notes")

    data = JSON.parse(data) || []

    data = data.sort(function (a, b) {
      var dateA = new Date(a.date).getTime()
      var dateB = new Date(b.date).getTime()
      return dateA < dateB ? 1 : -1
    })

    setNotes(data)
    setLoading(false)
  }

  const setNotesFn = (notes) => {
    localStorage.setItem("notes", JSON.stringify(notes))
    setNotes(notes)
  }

  return (
    <Context.Provider value={{ notes, setNotes: setNotesFn }}>
      {loading ? (
        <Loader />
      ) : (
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/" exact>
              <Notes />
            </Route>
            <Route path="/:id" exact>
              <Note />
            </Route>
            <Redirect from="*" to="/" />
          </Switch>
        </BrowserRouter>
      )}
    </Context.Provider>
  )
}

export default App
