import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import {db} from "./firebase";


const App = () => {
  const [posts, setPosts] = useState([
    {
      username: "Ashfaq__",
      caption: "this is props caption",
      imageUrl:
        "https://static.vecteezy.com/packs/media/components/global/search-explore-nav/img/vectors/term-bg-1-666de2d941529c25aa511dc18d727160.jpg",
    },
    {
      username: "Sabu_",
      caption: "How you Doin",
      imageUrl:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    },
    {
      username: "Aamir__",
      caption: "I making instagram clone buddy",
      imageUrl:
        "https://images.unsplash.com/photo-1544526226-d4568090ffb8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGQlMjBpbWFnZXxlbnwwfHwwfHw%3D&w=1000&q=80",
    },
  ]);

  useEffect(() => {
   db.collection("post").onSnapshot(snapshot => {
     setPosts(snapshot.docs.map(doc => doc.data()));
   })
  }, [])


  return (
    <div className="app">
      <div className="app__header">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="logo-image"
          className="app__headerImage"
        />
      </div>

      {posts.map((post) => {
        return (
          <Post
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
          />
        );
      })}
    </div>
  );
};

export default App;
