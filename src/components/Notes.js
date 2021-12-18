import React, { useContext, useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import Notecontext from "../Context/notes/NotesContext"
import AddNote from './AddNote'
import NoteItem from './NoteItem'
function Notes() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const Context = useContext(Notecontext);

    const { notes, getNotes, editNote } = Context;
    useEffect(() => {
        getNotes()
        // eslint-disable-next-line
    }, [])
    // const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "" })

    const updateNote = (currentNote) => {
        handleShow()
        // setNote(currentNote)
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description })
        console.log("Update Function Called")

    }

    const handleClick = (e) => {
        e.preventDefault();
        console.log("New Updated note", note)
        setShow(false)
        editNote(note.id, note.etitle, note.edescription)
        // console.log(note.etitle , note.edescription)
    }

    const handleChange = (e) => {
        // const {value} = e.target
        setNote({ ...notes, [e.target.name]: e.target.value })
    }
    return (
        <div className="container">
            <AddNote />
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={handleChange} placeholder="Enter Title" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={handleChange} placeholder="Description" />
                        </div>
                        {/* <div className="form-check">
                          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                         </div> */}
                        {/* <button type="submit" className="btn btn-primary" onClick={handleClick}>Update Note</button> */}
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClick}>
                        Update Note
                    </Button>
                </Modal.Footer>
            </Modal>
            <h1 className="my-2">Your Notes</h1>
            <div className="row my-3">
                {notes.map((notes) => {
                    return <NoteItem key={notes._id} updateNote={updateNote} note={notes} />
                })}
            </div>
        </div>
    )
}

export default Notes
