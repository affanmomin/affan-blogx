import {useState} from "react";
import { Button, Input } from "@nextui-org/react";

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  async function register(ev) {
    ev.preventDefault();
    const response = await fetch('https://blogx-backend.onrender.com/register', {
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: {'Content-Type':'application/json'},
    });
    if (response.status === 200) {
      alert('registration successful');
    } else {
      alert('registration failed');
    }
  }
  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <Input value={username} onInput={ev => setUsername(ev.target.value)} type="text" variant="bordered" label="Username" />
      <Input value={password} onInput={ev => setPassword(ev.target.value)} type="password" variant="bordered" label="Password" />
      <Button onClick={register} size="lg" style={{ width: "100%" }} color="primary">
        Register
      </Button>
    </form>
  );
}
