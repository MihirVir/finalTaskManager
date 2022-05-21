
const Task = require('../models/task');
const passport = require('passport')
const getAllTask = async (req, res) => {
    try {
        const tasks = await Task.find({});
        return res.status(200).json({ tasks })
    } catch (err) {
        return res.status(500).json({ msg: err })
    }
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ task })
    } catch (err) {
        res.status(500).json({msg: err})
    }
}
const getTask = async (req, res) => {
    try {
        
        const task = await Task.findOne({_id: req.params.id});
        return res.status(200).json({ task }); 
    } catch (err) {
        return res.status(500).json({msg:err})
    }
}
const updateTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate({_id: req.params.id},req.body, {
            new: true,
            runValidators: true
        })
        
        if(req.body.stage === 1 || req.body.stage === 2 || req.body.stage === 3) {
            res.status(200).json({ task })
            
        } else {
            return res.status(400).json({msg: "error"})
        }
        if(!task) {
            return res.status(404).json({msg: "Not Found Error"})
        }
        
    } catch (err) {
        return res.status(500).json({msg: err})
    }
}
module.exports = {
    getAllTask,
    createTask,
    updateTask,
    getTask
}