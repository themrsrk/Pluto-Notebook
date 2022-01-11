import { React, useState } from 'react';
import NoteContext from './NotesContext'


const initial = []
function NotesState(props) {

    const host = "http://localhost:5000"
    const [notes, setNotes] = useState(initial)

    // Get all Notes
    const getNotes = async () => {
        // API Call 
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3Njk2ZTNiZGE4M2IwZmQwNjg5OGIxIn0sImlhdCI6MTYzNTE2NzQ4MH0.KMS4F0OjWglMZ2Rhhkgz6VwOv6f148REAzIUolPxBZ0"
            }
        });
        const json = await response.json()
        // console.log(json)
        setNotes(json)
    }


    //Add note Function
    const addNote = async (title, description, tag) => {

         // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3Njk2ZTNiZGE4M2IwZmQwNjg5OGIxIn0sImlhdCI6MTYzNTE2NzQ4MH0.KMS4F0OjWglMZ2Rhhkgz6VwOv6f148REAzIUolPxBZ0"
        },
        body: JSON.stringify({title, description, tag})
      });

      const json = response.json()
      console.log(json)

        const note = {
            "_id": "6177fc3b6e9dfae66ff491ce",
            "user": "617696e3bda83b0fd06898b1",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2021-10-26T13:01:47.082Z",
            "__v": 0
        }
        //   setNotes(notes.push(note))
        setNotes(notes.concat(note)) //concat returns an array whereas push update an array
    }


    //Delete note Function

    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3Njk2ZTNiZGE4M2IwZmQwNjg5OGIxIn0sImlhdCI6MTYzNTE2NzQ4MH0.KMS4F0OjWglMZ2Rhhkgz6VwOv6f148REAzIUolPxBZ0"
        }});
        const json = response.json();
        console.log(json)
    
        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote)
    }
   



      const editNote = async (id, title, description, tag) => {
        // API Call 
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3Njk2ZTNiZGE4M2IwZmQwNjg5OGIxIn0sImlhdCI6MTYzNTE2NzQ4MH0.KMS4F0OjWglMZ2Rhhkgz6VwOv6f148REAzIUolPxBZ0"
        },
          body: JSON.stringify({title, description, tag})
        });
        // const json = response.json();
        const json = await response.json();
        console.log(json)
    
         let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if (element._id === id) {
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag; 
            break; 
          }
    
        }
        // console.log(id);
        setNotes(newNotes);
      }
    return (
        <div>
            <NoteContext.Provider value={{ notes, editNote, addNote, deleteNote, getNotes }}>
                {props.children}
            </NoteContext.Provider>
        </div>
    )
}

export default NotesState
