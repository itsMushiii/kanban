import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";

import { addList } from "../state/boardData";

const AddColumn = () => {
  const [listTitle, setListTitle] = useState("");
  const [modal, setModal] = useState(false);
  const [maxWidth, setMaxWidth] = React.useState("md");

  const CreateNewColumn = () => {
    addList(listTitle);
    setModal(false);
    setListTitle("");
  };

  return (
    <Box>
      <Button
        sx={{
          bgcolor: "#319795",
          color: "white",
          "&:hover": {
            bgcolor: "#319795",
          },
        }}
        variant="contained"
        onClick={(e) => setModal(true)}
      >
        Add New Task Column
      </Button>
      <Grid container>
        <Grid item lg={5} md={6} sm={12} xs={12}>
          <Dialog
            maxWidth={maxWidth}
            open={modal}
            onClose={(e) => setModal(false)}
          >
            <DialogTitle>Add New Task Column</DialogTitle>
            <DialogContent>
              <Box sx={{ mt: 3, minWidth: "400px" }}>
                <TextField
                  autoFocus
                  label="Column Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={listTitle}
                  onChange={(e) => setListTitle(e.target.value)}
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
                onClick={CreateNewColumn}
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </Box>
  );
};
export default AddColumn;
