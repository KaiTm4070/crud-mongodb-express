const express = require('express');
const userSchema = require("../models/user");

const router = express.Router();

// create user
router.post('/users', (req,res) =>{
    const user = userSchema(req.body);
    user
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// get all users
router.get('/users', (req,res) =>{
    userSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//get a user
router.get('/users/:id', (req,res) =>{
    const { id } = req.params;
    userSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// update a usere
router.put('/users/:id', (req,res) =>{
    const { id } = req.params;
    const { name,age,email } = req.body;
    userSchema
        .updateOne({ _id: id }, { $set: {name, age, email} })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// delete a usere
router.delete('/users/:id', async (req,res) =>{
    try{
        await userSchema.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User delete" });
    } catch (error){
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
