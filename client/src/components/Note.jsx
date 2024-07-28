import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

function Note(props) {

  async function deleteNote(id) {
    try {
      const url = `https://react4-server.vercel.app/delete/${encodeURIComponent(id)}`;
      const response = await fetch(url, {
        method: "DELETE"
      });
      // targets the refresh of notes from db
      props.onDelete();
      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  }
  

  return (
    <div className="note">
      <h1>{props.title} {props.id}</h1>
      <p>{props.details}</p>
      <button onClick={() => deleteNote(props.id)}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
