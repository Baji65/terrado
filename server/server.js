// server.js

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB

mongoose.connect(process.env.mongodb)
.then((response) => {
    console.log("Connected to mongo DB successfully!");
})
.catch( err => {
    console.log("Connection to DB failed!", err);
});
// Define User Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);



// Routes

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  console.log(req.body)
  const user = await User.findOne({ username });

  if (!user || !bcrypt.compareSync(password, user.password)) {
   
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ username }, process.env.secretkey);
  console.log(token)
  res.json({ token });
});   

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();

  res.status(200).json({ message: 'User registered successfully' });
});


//tasks

const Task = mongoose.model('Task', { task: String });

app.post('/api/tasks', async (req, res) => {
  const { task } = req.body;
console.log(req.body)
  try {
    const newTask = new Task({ task });
    await newTask.save();
    res.status(201).json({ message: 'Task added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// to get saved tasks

app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API to remove a task
app.delete('/api/tasks/:id', async (req, res) => {
  const taskId = req.params.id;

  try {
    const tt=await Task.deleteOne({ _id: taskId });
    console.log(tt)
    
    res.json({ message: 'Task removed successfully' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//api to edit task
app.put('/api/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  const { task } = req.body;
  console.log(taskId)

  try {
    const updatedTask = await Task.findOneAndUpdate(
      {_id:taskId},
      { task },
      { new: true } // Return the modified document
    );

    if (updatedTask) {
      res.json({ message: 'Task updated successfully', task: updatedTask });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
