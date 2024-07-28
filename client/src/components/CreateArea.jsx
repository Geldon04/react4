import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";


function CreateArea(props) {
  
  //use to crea a note
  const [newNote, setNewNote] = useState({
    title: "",
    details: "",
  });
  
  //use state for collapsible feature
  const [isExpanded, setExpanded] = useState(false);

  function onExpanded() {
    setExpanded(true);
  }

  //function for triggering & updating the values of the notes to be submitted
  function handleChange(event) {
    const { name, value } = event.target;
    setNewNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }
  
  //create a new note
   async function submitNote(e)  {
    e.preventDefault();
    try {
      const response = await fetch("https://react4-server.vercel.app/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote)
      });
      //targets the refresh of notes from db
      props.onCreate();
      // window.location = "/";
      setNewNote({
        title: "",
        details: "",
      });
      setExpanded(false);
    } catch (err) {
      console.error(err.message);
    }
  }
  
  return (
    <div>
      <form className="create-note" onSubmit={submitNote}>
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={newNote.title}
            placeholder="Title"
            autoFocus
          />
        )}

        <textarea
          name="details"
          onChange={handleChange}
          value={newNote.details}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
          onClick={onExpanded}
        />
        <Zoom in={isExpanded ? true : false}>
          <Fab type="submit">
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
  
}

export default CreateArea;
