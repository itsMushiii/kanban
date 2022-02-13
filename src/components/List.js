import React, { useState } from "react";
import Card from "./Card";
import ListTitle from "./ListTitle";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Box } from "@mui/system";
import { addCard } from "../state/boardData";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const sortFn = (data) => (a, b) => {
  return data[a].position - data[b].position;
};

const List = ({ listId, listData }) => {
  const cardIds = Object.keys(listData.cards).sort(sortFn(listData.cards));
  const [dragBlocking, setDragBlocking] = useState(false);
  const [taskModal, setTaskModal] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const onSave = () => {
    let content = { title: title, desc: desc };

    addCard(listId, content);
    setTitle("");
    setDesc("");
    setTaskModal(false);
  };

  return (
    <Box>
      <Draggable
        disableInteractiveElementBlocking={!dragBlocking}
        draggableId={listId}
        index={listData.position}
      >
        {(provided) => (
          <Box ref={provided.innerRef} {...provided.draggableProps}>
            <Box
              sx={{
                borderRadius: "3px",
                bgcolor: "#ffffff",
              }}
            >
              <Box sx={{ mt: 2, ml: 2, mb: 2 }}>
                <ListTitle
                  dragHandleProps={provided.dragHandleProps}
                  listId={listId}
                  title={listData.list_title}
                  setDragBlocking={setDragBlocking}
                />
              </Box>
              <Box
                sx={{
                  minHeight: "300px",
                }}
              >
                <Droppable droppableId={listId}>
                  {(droppableProvided, droppableSnapshot) => (
                    <Box
                      sx={{ minHeight: "300px" }}
                      ref={droppableProvided.innerRef}
                    >
                      {cardIds.map((id) => {
                        return (
                          <Box>
                            <Card
                              key={id}
                              cardId={id}
                              listId={listId}
                              cardData={listData.cards[id]}
                            />
                          </Box>
                        );
                      })}
                      {droppableProvided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </Box>

              <p
                style={{
                  backgroundColor: "#38a169",
                  color: "white",
                  width: "70px",
                  cursor: "pointer",

                  align: "right",
                  marginLeft: "190px",
                }}
                onClick={() => setTaskModal(true)}
              >
                Add Task
              </p>
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
            id="name"
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
export default List;
