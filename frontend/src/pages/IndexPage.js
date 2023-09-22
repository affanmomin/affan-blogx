import Post from "../Post";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://blogx-backend.onrender.com/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
        setIsLoading(false); // Set isLoading to false after fetching data
      });
    });
  }, []);

  return (
    <>
      {isLoading ? (
         <div
         style={{ fontSize: 30, alignItems: "center", height: "50rem" }}
         className="w-full flex justify-center align-center"
       >
         Loading...
       </div>
      ) : (
        <>
          {posts.length ? (
            posts.map((post) => <Post {...post} />)
          ) : (
            <div
              style={{ fontSize: 30, alignItems: "center", height: "50rem" }}
              className="w-full flex justify-center align-center"
            >
              No posts
            </div>
          )}
        </>
      )}
    </>
  );
}