import ReactMarkdown from "react-markdown"

function Markdown(props) {
  return <ReactMarkdown children={props.text} />
}

export default Markdown
