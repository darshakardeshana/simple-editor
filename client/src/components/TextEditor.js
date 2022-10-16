import { useCallback, useEffect, useState } from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"
import { io } from "socket.io-client"

const socket = io("http://localhost:3001")

export default function TextEditor() {
  const [quill, setQuill] = useState();

  socket.on("receive-changes", delta => {
    if (quill == null)
      return;

    quill.updateContents(delta);
  });

  useEffect(() => {
    if (quill == null)
      return;

    quill.on("text-change", (delta, oldDelta, source) => {
      if (source !== "user")
        return;

      socket.emit("send-changes", delta);
    });
  }, [socket, quill]);

  const containerRef = useCallback(() => {
    var container = document.getElementById('container');
    var editor = new Quill(container, {
      theme: 'snow'
    });
    setQuill(editor);
  }, []);

  return <div id="container" ref={containerRef}></div>
}
