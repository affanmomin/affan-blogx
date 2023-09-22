import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Button, Input } from "@nextui-org/react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  async function login(ev) {
    ev.preventDefault();
    const response = await fetch("https://blogx-backend.onrender.com/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert("wrong credentials");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <Input value={username} onInput={ev => setUsername(ev.target.value)} type="text" variant="bordered" label="Username" />
      <Input value={password} onInput={ev => setPassword(ev.target.value)} type="password" variant="bordered" label="Password" />
      <Button onClick={login} size="lg" style={{ width: "100%" }} color="primary">
        Log In
      </Button>
    </form>
  );
}
