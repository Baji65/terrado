// TaskForm.js




// TaskForm.js

import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onClose }) => {
  const [task, setTask] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/tasks', { task });

      setTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="task" className="form-label">
            Task:
          </label>
          <input
            type="text"
            className="form-control"
            id="task"
            placeholder="Enter Task"
            name="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </form>
      <button onClick={onClose} className="btn btn-secondary mt-2">
        Close Task
      </button>
    </div>
  );
};

export default TaskForm;
