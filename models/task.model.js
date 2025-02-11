import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    userIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    status: {
        type: [String],
        enum:['todo', 'accept', 'pending', 'completed'],
        required: true
    },
}, {timestamps: true})

const Task = mongoose.model('Task', taskSchema);
export default Task;