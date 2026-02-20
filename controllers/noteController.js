import notes from "../models/notesModel.js";

// fetch all the notes created by user
export const fetchNotes = async(req, res) => {
    try {
        
        const userNotes = await notes.find({createdBy: req.user._id});
        res.json(userNotes);

    } catch (error) {
        
        console.error(error);
        res.status(500).json({msg: "server error."});

    }
};

// Create a note
export const createNote = async(req, res) => {

    const{title, description} = req.body;

    try {

        if(!title || !description){
            return res.status(400).json({msg: "please fill all the fields."});
        };
        const newNote = await notes.create({
            title: title,
            description: description,
            createdBy: req.user._id
        });
        res.status(201).json(newNote);
        
    } catch (error) {

        console.error(error);
        res.status(500).json({msg: "server error."});
        
    };
};

// find a note

export const findNote = async(req, res) => {
    try {

        const requiredNote = await notes.findById(req.params.id);
        if(!requiredNote){
            return res.status(404).json({msg: "Not found."});
        };

        res.status(200).json(requiredNote);
        
    } catch (error) {
        
        console.error(error);
        res.status(500).json({msg: "Server error."});        

    }
};

// update a note

export const updateNote = async(req, res) => {
    
    const { title, description } = req.body;
    
    try {
        const requiredNote =await  notes.findById(req.params.id);
        if(!requiredNote){
            return res.status(404).json({msg: "Not found."});
        };

        requiredNote.title = title || requiredNote.title;
        requiredNote.description = description || requiredNote.description;
        const updatedNote = await requiredNote.save();
        res.status(200).json(updatedNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: "Server error."});
    };
};

// delete a note

export const deleteNote = async(req, res)=>{
    try {

        const requiredNote = notes.findById(req.params.id);
        if(!requiredNote){
            return res.status(404).json({msg: "Not found."});
        }
        await requiredNote.deleteOne();
        res.status(200).json({msg: "Note has been deleted."});

    } catch (error) {
        
        console.error(error);
        res.status(500).json({msg: "Server error."});
        
    };
};