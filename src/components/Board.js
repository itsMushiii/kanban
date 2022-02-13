import React, { useState, useEffect } from "react";
import {
  boardDataSubject,
  reorderListPosition,
  reorderCardPosition,
} from "../state/boardData";
import List from "./List";
import AddColumn from "./AddColumn";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";

const sortFn = (data) => (a, b) => {
  return data[a].position - data[b].position;
};

const Board = () => {
  const [boardData, setBoardData] = useState(null);
  useEffect(() => {
    const sub = boardDataSubject.subscribe((bd) => setBoardData(bd));
    return () => sub.unsubscribe();
  }, []);

  if (!boardData) {
    return <div>loading</div>;
  }

  const onBeforeDragStart = (tmp) => {
    if (document.activeElement.tagName.toUpperCase() === "TEXTAREA") {
      document.activeElement.blur();
    }
  };

  const listIds = Object.keys(boardData).sort(sortFn(boardData));

  return (
    <Box>
      <DragDropContext
        onBeforeDragStart={onBeforeDragStart}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <br />
        <Box sx={{ paddingRight: "50px", float: "right" }}>
          <AddColumn />
        </Box>
        <br />

        <Droppable droppableId="board" type="COLUMN" direction="horizontal">
          {(provided) => (
            <Box ref={provided.innerRef} {...provided.droppableProps}>
              <Grid container spacing={1} columns={20}>
                {listIds.map((id) => {
                  return (
                    <Grid item lg={4}>
                      <List key={id} listId={id} listData={boardData[id]} />
                    </Grid>
                  );
                })}
                {provided.placeholder}
              </Grid>
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};
export default Board;

const onDragStart = (tmp) => {};

const onDragEnd = (result) => {
  if (!result.destination) {
    return;
  }
  const source = result.source;
  const destination = result.destination;
  if (
    source.droppableId === destination.droppableId &&
    source.index === destination.index
  ) {
    return;
  }

  if (result.type === "COLUMN") {
    reorderListPosition(source.index, destination.index);
    return;
  }

  reorderCardPosition(source, destination, result.draggableId);
};
