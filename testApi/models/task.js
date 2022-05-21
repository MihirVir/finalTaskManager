const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
   
    name: {
        type:String,
        required: [true, 'error name entered'],
        trim: true
    },
    stage: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Task', TaskSchema);