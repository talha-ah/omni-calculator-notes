import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import { useState, useEffect } from "react"
import { useQuery } from "@apollo/client"

import Context from "./context/notes"

import Note from "./pages/note/note"
import Notes from "./pages/notes/notes"

import { fetchNotesGQL } from "./apollo/queries"

import Header from "./components/header/header"
import { Loader } from "./components/loader/loader"

function App() {
  const [notes, setNotes] = useState([])
  const { loading, data } = useQuery(fetchNotesGQL)

  useEffect(() => {
    fetchNotes()
    // eslint-disable-next-line
  }, [data])

  const fetchNotes = async () => {
    if (data) {
      let arr = [...data.notes]

      arr = arr.sort(function (a, b) {
        var dateA = new Date(a.date).getTime()
        var dateB = new Date(b.date).getTime()
        return dateA < dateB ? 1 : -1
      })

      setNotes(arr)
    }
  }

  return (
    <Context.Provider value={{ notes, setNotes }}>
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
