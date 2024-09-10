import { marked } from "marked"
import { useState } from "react"
import SAMPLE from "./sample.json"
function App() {
  const [editor, setEditor] = useState(SAMPLE)

  return (
    <>
      <div className=' w-screen h-auto min-h-screen bg-black text-white flex flex-col justify-start items-center space-y-6  '>
        <h1>Markdown Previewer</h1>
        <textarea name="editor" id="editor" className=" w-[40rem] h-[15rem] "
          onChange={e => setEditor(e.target.value)} value={editor}></textarea>
        <Editor editor={editor} />
      </div>

    </>
  )
}

function Editor({ editor }: { editor: string }) {
  const rendered = new marked.Renderer();
  const markeddown = marked(editor) as string
  return (
    <div className=" w-[80%] h-auto bg-white text-black ">
      <div id="preview" dangerouslySetInnerHTML={{ __html: marked(markeddown, { renderer: rendered }) }}></div>
    </div>
  )
}
export default App
