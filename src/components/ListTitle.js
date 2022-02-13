import React, { useState, useEffect } from "react";
import { updateListTitle, deleteList } from "../state/boardData";
import { Box, Typography } from "@mui/material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const ListTitle = ({ dragHandleProps, listId, title }) => {
  const [updateValue, setUpdateValue] = useState("");
  const [modal, setModal] = useState(false);
  const [t, setT] = useState(title);

  const onSave = () => {
    updateListTitle(listId, t);
    setT("");
    setModal(false);
  };

  const deleteClick = () => {
    deleteList(listId);
  };
  useEffect(() => {
    setUpdateValue(title);
  }, [title]);

  return (
    <Box {...dragHandleProps}>
      <Typography variant="h5" display="inline">
        {updateValue}
      </Typography>
      <Typography variant="h5" display="inline">
        <Box sx={{ float: "right", mt: 1, mb: 2, mr: 1 }}>
          <i
            onClick={(e) => setModal(true)}
            class="fa fa-edit"
            style={{ fontSize: "30px", mr: 3 }}
          />

          <i
            onClick={deleteClick}
            className="fa fa-trash-o"
            style={{ fontSize: "30px", color: "red", mr: 2 }}
          />
        </Box>
      </Typography>
      <Dialog open={modal} onClose={(e) => setModal(false)}>
        <DialogTitle>Update Title</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 3, minWidth: "400px" }}>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              type="text"
              fullWidth
              variant="outlined"
              value={t}
              onChange={(e) => {
                setT(e.target.value);
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              bgcolor: "#e53935",
              color: "white",
              borderRadius: "4px",
              "&:hover": {
                bgcolor: "#e53935",
              },
            }}
            variant="contained"
            onClick={(e) => setModal(false)}
          >
            Close
          </Button>
          <Button
            sx={{
              bgcolor: "#9e9e9e",
              color: "white",
              borderRadius: "4px",
              "&:hover": {
                bgcolor: "#9e9e9e",
              },
            }}
            variant="contained"
            onClick={onSave}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default ListTitle;
