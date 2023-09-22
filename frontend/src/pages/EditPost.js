import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import Editor from "../Editor";
import { Button, Input } from "@nextui-org/react";

export default function EditPost() {
  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect,setRedirect] = useState(false);

  useEffect(() => {
    fetch('http://localhost:4000/post/'+id)
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
        });
      });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }
    const response = await fetch('http://localhost:4000/post', {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/post/'+id} />
  }

  return (
    <form>
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
          className="mt-4 float-right"
          onClick={updatePost}
          size="lg"
          color="success"
        >
          Update
        </Button>
    </form>
  );
}