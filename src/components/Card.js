import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { updateCard, deleteCard } from "../state/boardData";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";

const Card = ({ listId, cardId, cardData }) => {
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDesc, setUpdateDesc] = useState("");
  const [taskModal, setTaskModal] = useState(false);
  const [title, setTitle] = useState(cardData.card_title);
  const [desc, setDesc] = useState(cardData.card_content);

  const deleteClick = () => {
    deleteCard(listId, cardId);
  };
  useEffect(() => {
    setUpdateTitle(cardData.card_title);
    setUpdateDesc(cardData.card_content);
  }, [cardData]);
  const onSave = () => {
    updateCard(listId, cardId, title, desc);
    setTitle("");
    setDesc("");
    setTaskModal(false);
  };

  return (
    <Box>
      <Draggable draggableId={cardId} index={cardData.position}>
        {(draggableProvided, draggableSnapshot) => (
          <Box
            sx={{ pb: 2 }}
            ref={draggableProvided.innerRef}
            {...draggableProvided.draggableProps}
            {...draggableProvided.dragHandleProps}
          >
            <Box sx={{ bgcolor: "#ebecf0", mr: "5px", ml: "5px" }}>
              {updateTitle}
              <br />
              {updateDesc}

              <i
                onClick={deleteClick}
                className="fa fa-trash-o"
                style={{
                  fontSize: "20px",
                  color: "red",
                  float: "right",
                  mt: 2,
                }}
              />
              <i
                onClick={(e) => setTaskModal(true)}
                className="fa fa-edit"
                style={{ fontSize: "20px", float: "right", mr: 3 }}
              />
            </Box>
          </Box>
        )}
      </Draggable>
      <Dialog open={taskModal} onClose={(e) => setTaskModal(false)}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
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
            onClick={(e) => setTaskModal(false)}
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
export default Card;
