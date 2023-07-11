import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [confirmation, setConfirmation] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function checkConfirmation() {}

  return (
    <div>
      <Button
        color="error"
        size="small"
        style={{ padding: " 0 0 0 1rem" }}
        onClick={handleClickOpen}
      >
        Remove
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Delete?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Write CONFIRM in order to Delete the course.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="CONFIRM"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setConfirmation(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={checkConfirmation} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
