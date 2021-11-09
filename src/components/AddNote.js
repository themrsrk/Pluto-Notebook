// import e from 'express'
import React,{useContext, useState} from 'react'
import Notecontext from "../Context/notes/NotesContext"

function AddNote() {
    const Context = useContext(Notecontext)
    const {addNote} = Context
    const [note, setNote] = useState({title:"", description:"",tag:"default"})

    const handleChange = (e)=>{
            setNote({...note, [e.target.name]: e.target.value})
            console.log(e.target.value)
    }

    const handleClick = (e)=>{
        e.preventDefault()
            addNote(note.title, note.description, note.tag)
    }
    return (
        <div>
        <div className="container my-3">
        <h1>Add Notes</h1>
        <form>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={handleChange} placeholder="Enter Title" />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <input type="text" className="form-control" id="description" name="description" onChange={handleChange} placeholder="Description" />
            </div>
            {/* <div className="form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div> */}
            <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
    </div>
    </div>
    )
}

export default AddNote
