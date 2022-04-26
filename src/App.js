import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db, auth } from "./firebase";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openSignIn, setOpenSignIn] = useState(false)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user logged in..
        console.log(authUser);
        setUser(authUser);
        if (authUser.displayName) {
          // don't update the profile
        } else {
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        // user logged out..
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    }
  }, [user, username]);

  useEffect(() => {
    db.collection("post").onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
    });
  }, []);

  function signUp(e) {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName : username
        })
      })
      .catch((error) => alert(error.message));
  }

const signIn = (e) => {
e.preventDefault();
auth.signInWithEmailAndPassword(email, password).catch((error) => alert(error.message))
setOpenSignIn(false)
}

  return (
    <div className="app">
      <div className="app__header">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="logo-image"
          className="app__headerImage"
        />
        {user ? (<Button onClick={() => auth.signOut()}>Log out</Button>) : <div className="app__loginContainer"><Button onClick={() => {setOpenSignIn(true)}}>sign in</Button>
        <Button onClick={handleOpen}>sign up</Button>
        </div>}
        
      </div>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <center>
                <div className="app__header">
                  <img
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                    alt="logo-image"
                    className="app__headerImage"
                  />
                </div>
              </center>
            </Typography>
            <form>
              <center>
                <Input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </center>
              <center>
                {" "}
                <Button type="submit" onClick={signUp}>
                  SIGN UP
                </Button>
              </center>
            </form>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
            ></Typography>
          </Box>
        </Modal>
      </div>
      <div>
        <Modal
          open={openSignIn}
          onClose={()=> setOpenSignIn(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <center>
                <div className="app__header">
                  <img
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                    alt="logo-image"
                    className="app__headerImage"
                  />
                </div>
              </center>
            </Typography>
            <form>
              <center>
              
                <Input
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </center>
              <center>
                {" "}
                <Button type="submit" onClick={signIn}>
                  SIGN IN
                </Button>
              </center>
            </form>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
            ></Typography>
          </Box>
        </Modal>
      </div>

      {posts.map(({ post, id }) => {
        return (
          <Post
            key={id}
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
          />
        );
      })}
    </div>
  );
}

export default App;
