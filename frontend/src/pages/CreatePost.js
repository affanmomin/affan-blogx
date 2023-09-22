import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";
import { Button, Input } from "@nextui-org/react";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    ev.preventDefault();
    const response = await fetch("https://blogx-backend.onrender.com/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <form onSubmit={createNewPost}>
      <Input
        className="mb-4"
        value={title}
        onInput={(ev) => setTitle(ev.target.value)}
        type="text"
        variant="bordered"
        label="Title"
      />
      <Input
        className="mb-4"
        value={summary}
        onInput={(ev) => setSummary(ev.target.value)}
        type="text"
        variant="bordered"
        label="Summary"
      />

      <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
      <Editor value={content} onChange={setContent} />

      <Button
        isDisabled={!files[0] || title === '' || summary === ''}
        className="mt-4 float-right"
        onClick={createNewPost}
        size="lg"
        color="success"
      >
        Create
      </Button>
    </form>
  );
}
