import { useState, useEffect } from "react"
import { Button } from "@material-ui/core"
import InstagramEmbed from "react-instagram-embed"

import SignInModal from "./components/Modals/SignInModal"
import SignUpModal from "./components/Modals/SignUpModal"
import ImageUpload from "./components/ImageUpload"
import Post from "./components/Post"

import userContext from "./context/UserContext"

import { db, auth } from "./firebase"

import "./App.scss"

function App() {
  const [posts, setPosts] = useState([])

  const [open, setOpen] = useState(false)
  const [openSignIn, setOpenSignIn] = useState(false)

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        setUser(authUser)
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [user, username])

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot => {
        setPosts(snapshot.docs.map(doc => ({ post: doc.data(), id: doc.id })))
      })
  }, [])

  const signUp = event => {
    event.preventDefault()

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        return authUser.user.updateProfile({
          displayName: username,
        })
      })
      .catch(error => alert(error.message))

    setOpen(false)
  }

  const signIn = event => {
    event.preventDefault()

    auth
      .signInWithEmailAndPassword(email, password)
      .catch(error => alert(error.message))

    setOpenSignIn(false)
  }

  return (
    <div className="app">
      <userContext.Provider
        value={{
          username,
          setUsername,
          email,
          setEmail,
          password,
          setPassword,
        }}
      >
        <SignInModal
          open={openSignIn}
          setOpen={setOpenSignIn}
          handler={signIn}
        />
        <SignUpModal open={open} setOpen={setOpen} handler={signUp} />
      </userContext.Provider>

      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
        {user ? (
          <Button onClick={() => auth.signOut()}>Logout</Button>
        ) : (
          <div className="app__loginContainer">
            <Button onClick={e => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={e => setOpen(true)}>Sign Up</Button>
          </div>
        )}
      </div>

      <div className="app__posts">
        <div className="app__postsList">
          {posts.map(({ post, id }) => (
            <Post
              key={id}
              postId={id}
              user={user}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
            />
          ))}
        </div>

        <div className="app__postsRight">
          <InstagramEmbed
            url="https://www.instagram.com/p/CH5rbXijsyL/"
            clientAccessToken="1068148143638626|a9b9853d87fb33cdc31ac2ad0426818d"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>
      </div>

      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h2 style={{ padding: "40px", textAlign: "center" }}>
          First login to upload
        </h2>
      )}
    </div>
  )
}

export default App
