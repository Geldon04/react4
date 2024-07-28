import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {

  const [notes, setNotes] = useState([]);

  //get the notes from database
  async function getNotes() {
    try {
      const response = await fetch("https://react4-server.vercel.app/", {
        method: "GET"
      });
      const jsonData = await response.json();
      setNotes(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div>
      <Header />
      <CreateArea onCreate={getNotes}/>
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={noteItem.id}
            id={noteItem.id}
            title={noteItem.title}
            details={noteItem.details}
            onDelete={getNotes}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
