


// TaskList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = ({ onEdit, onRemove }) => {
  const [tasks, setTasks] = useState([]);
  const [edit, setEdit] = useState(true);
  const [taskEdit, setTaskEdit] = useState('');
  const [editedTaskId, setEditedTaskId] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [tasks]);

  const handleEditClick = (task) => {
    setEdit(false);
    onEdit(task);
    setTaskEdit(task.task);
    setEditedTaskId(task._id);
  };

  const handleCancelClick = () => {
    setEdit(true);
    setTaskEdit('');
    setEditedTaskId(null);
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${editedTaskId}`, {
        task: taskEdit,
      });

      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);

      setEdit(true);
      setTaskEdit('');
      setEditedTaskId(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Task List</h2>
      <ul className="list-unstyled">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="border p-3 mb-3 d-flex justify-content-between align-items-center"
          >
            <div>{task.task}</div>
            {edit ? (
              <div>
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => handleEditClick(task)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => onRemove(task._id)}
                >
                  Remove
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  value={taskEdit}
                  onChange={(e) => setTaskEdit(e.target.value)}
                  required
                />
                <button
                  className="btn btn-success mr-2"
                  onClick={handleSaveClick}
                >
                  Save
                </button>
                <button className="btn btn-secondary" onClick={handleCancelClick}>
                  Cancel
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;




