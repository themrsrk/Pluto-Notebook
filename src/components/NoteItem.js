import React, {useContext} from 'react'
// import { update } from '../../backend/models/User';
import Notecontext from "../Context/notes/NotesContext"
function NoteItem(props) {
    const Context = useContext(Notecontext)
    const {deleteNote} = Context;
    const {note, updateNote} = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                {/* <img className="card-img-top" src="..." alt="Card image cap"/> */}
                <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus sed deserunt repellendus nostrum magnam accusantium aperiam voluptas in facere architecto. </p>
                <i className="far fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
                <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id)}} ></i> <br />
                <a href="/" className="btn btn-primary my-3">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default NoteItem


