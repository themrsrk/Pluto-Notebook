import React, { useContext, useEffect, useRef,  } from 'react'
import Notecontext from "../Context/notes/NotesContext"
import AddNote from './AddNote'
import NoteItem from './NoteItem'
function Notes() {
    const context = useContext(Notecontext);
    const { notes, getNotes } = context;
    useEffect(() => {
        getNotes()
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    // const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" })

    const updateNote = (currentNote) => {
        ref.current.click()
        // setNote({ etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
        console.log("Update Function Called")
    }

    // const handleClick = (e) => {
    //     // console.log("Updating the note...", note)
    //     e.preventDefault();
    // }

    // const onChange = (e) => {
    //     // setNote({ ...notes, [e.target.name]: e.target.value })
    // }
    return (
        <div className="container">
            <AddNote />
            {/* <!-- Button trigger modal --> */}
            <button ref={ref} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Hello World this is changing point
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Update Notes</button>
                        </div>
                    </div>
                </div>
            </div>
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
