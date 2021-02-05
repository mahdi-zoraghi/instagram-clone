import { useEffect, useState } from "react"
import { Avatar, Button, TextField } from "@material-ui/core"
import firebase from "firebase/app"

import { db } from "../../firebase"

import "./Post.scss"

function Post({ username, caption, imageUrl, postId, user }) {
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState("")

  useEffect(() => {
    let unsubscribe
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot(snapshot =>
          setComments(snapshot.docs.map(doc => doc.data()))
        )
    }
    return () => unsubscribe()
  }, [postId])

  const postComment = event => {
    event.preventDefault()

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })

    setComment("")
  }

  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" alt="mahdi_zoraghi" />
        <h3>{username}</h3>
      </div>

      <img className="post__image" alt="" src={imageUrl} />

      <h4 className="post__text">
        <strong>{username}</strong> {caption}
      </h4>

      <div className="post__comments">
        {comments.map((comment, i) => (
          <p key={i}>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>

      {user && (
        <form className="post__commentBox">
          <TextField
            type="text"
            placeholder="Add a comment..."
            className="post__input"
            value={comment}
            onChange={e => setComment(e.target.value)}
            variant="outlined"
          />
          <Button
            type="submit"
            disabled={!comment}
            className="post__button"
            onClick={postComment}
            color="primary"
            variant="outlined"
          >
            Post
          </Button>
        </form>
      )}
    </div>
  )
}

export default Post
