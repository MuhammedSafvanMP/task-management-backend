
import  Task from '../models/task.model.js';

// Create a new task
export const createATask = async (req, res) => {
    try {
        const { title, text, userIds } = req.body;

        const newTask = new Task({
            title,
            text,
            userIds,
            status: 'todo'
        });

        await newTask.save();
        res.status(201).json({ message: "Task created successfully", task: newTask });
    } catch (error) {
        res.status(500).json({ message: "Error creating task", error: error.message });
    }
};

// Get all tasks
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate("userIds", "name email"); // Populate user data
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error: error.message });
    }
};

// Get a single task by ID
export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate("userIds", "name email");

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Error fetching task", error: error.message });
    }
};

// Update a task
export const updateTask = async (req, res) => {
    try {
        const { title, text, userIds, status } = req.body;
        console.log(status);
        

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { title, text, userIds, status },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
        res.status(500).json({ message: "Error updating task", error: error.message });
    }
};

// Delete a task
export const deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error: error.message });
    }
};


// get one user task only

export const AuserTask = async (req, res) => {
    try {

        const tasks = await Task.find({ userIds: req.params.id }).populate("userIds", "name email");

        if (!tasks.length) {
            return res.status(404).json({ message: "No tasks found for this user" });
        }

        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching tasks", error: error.message });
    }
};
