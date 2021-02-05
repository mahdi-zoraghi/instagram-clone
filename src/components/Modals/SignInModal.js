import { useContext } from "react"
import { Modal, TextField, Button, makeStyles } from "@material-ui/core"

import UserContext from "../../context/UserContext"

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

function SignInModal({ open, setOpen, handler }) {
  const classes = useStyles()

  const { email, setEmail, password, setPassword } = useContext(UserContext)

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className={classes.paper}>
        <form className="app__signup">
          <center>
            <img
              className="app__headerImage app__modalItem"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""
            />
          </center>

          <TextField
            placeholder="Email"
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            variant="outlined"
            className="app__modalItem"
          />
          <TextField
            placeholder="Password"
            type="text"
            value={password}
            onChange={e => setPassword(e.target.value)}
            variant="outlined"
            className="app__modalItem"
          />
          <Button type="submit" className="app__modalItem" onClick={handler}>
            Sign in
          </Button>
        </form>
      </div>
    </Modal>
  )
}

export default SignInModal
