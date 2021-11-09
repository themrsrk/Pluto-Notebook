const express = require("express")
const router = express.Router();
const fetchuser = require('../middleware/fetchUser');
const Note = require("../models/Notes")
const { body, validationResult } = require('express-validator');



// //ROUTE:1 FETCH NOTES FROM DATABASE using GET: localhost:5000/api/auth/fetchallnotes
// router.get("/fetchallnotes",fetchUser, async (req,res)=>{
//         const notes = await Notes.find({user: req.user.id})
//         res.json(notes)
// })

// //ROUTE:2 Add NOTES  using POST: localhost:5000/api/auth/addnotes

// router.post("/addnotes",fetchUser, [
//         body('title',"Title should be 5 characters long").isLength({ min: 5 }),
//         body('description', "Description should be 8 characters long").isLength({ min: 8 }),

// ],async (req,res)=>{
//         try{
//                 const {title, description, tag} = req.body;
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//           return res.status(400).json({ errors: errors.array() });
//         }

//                 const notes = new Note({
//                 title,description,tag, user:user.req.id
//                 })
//                 const savedNotes = await note.save()
//         res.json(savedNotes)
//         }
//         catch(error){
//                 res.status(400).json({error:"Something is Wrong"})
//         }
// })
// ROUTE 1: Get All the Notes using: GET "/api/auth/getuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
        try {
                const notes = await Note.find({ user: req.user.id });
                res.json(notes)
        } catch (error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error");
        }
})

// ROUTE 2: Add a new Note using: POST "/api/auth/addnote". Login required
router.post('/addnote', fetchuser, [
        body('title', 'Enter a valid title').isLength({ min: 3 }),
        body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
                try {

                        const { title, description, tag } = req.body;

                        // If there are errors, return Bad request and the errors
                        const errors = validationResult(req);
                        if (!errors.isEmpty()) {
                                return res.status(400).json({ errors: errors.array() });
                        }
                        const note = new Note({
                                title, description, tag, user: req.user.id
                        })
                        const savedNote = await note.save()

                        res.json(savedNote)

                } catch (error) {
                        console.error(error.message);
                        res.status(500).send("Internal Server Error");
                }
        })
router.put('/updatenote/:id', fetchuser, async (req, res) => {
        const { title, description, tag } = req.body;
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) { //to check that user edit his own notes or not
                return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });

})

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
        try {
                // Find the note to be delete and delete it
                let note = await Note.findById(req.params.id);
                if (!note) { return res.status(404).send("Not Found") }

                // Allow deletion only if user owns this Note
                if (note.user.toString() !== req.user.id) {
                        return res.status(401).send("Not Allowed");
                }

                note = await Note.findByIdAndDelete(req.params.id)
                res.json({ "Success": "Note has been deleted", note: note });
        } catch (error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error");
        }
})

module.exports = router