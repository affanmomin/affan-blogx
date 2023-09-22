import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { Link, Button } from "@nextui-org/react";
export default function Header() {
  const navigate = useNavigate()

  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {

    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
    navigate('/')
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        BlogX
      </Link>
      <nav>
        {username && (
          <>
            <Button
              href="/create"
              as={Link}
              color="primary"
              variant="solid"
            >
              Create new post
            </Button>
            <Button
              onClick={logout}
              as={Link}
              color="danger"
              variant="solid"
            >
              Logout ({username})
            </Button>
          </>
        )}
        {!username && (
          <>
            <Button
              href="/login"
              as={Link}
              color="primary"
              variant="solid"
            >
              Login
            </Button>
            <Button
              href="/register"
              as={Link}
              color="warning"
              variant="solid"
            >
              Register
            </Button>
          </>
        )}
      </nav>
    </header>
  );
}
