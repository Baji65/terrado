

import React from "react";
import axios from "axios";

import TaskList from "./TaskList";

const Taskpage = () => {
  const handleEditTask = (task) => {
    console.log(task._id);
    console.log(task.task);
  };

  const handleRemoveTask = async (taskId) => {
    console.log(taskId);
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);

      const response = await axios.get('http://localhost:5000/api/tasks');
      //setTasks(response.data);
    } catch (error) {
      console.error('Error removing task:', error);
    }
  };

  return (
    <div className="container mt-4">
      
      <TaskList onEdit={handleEditTask} onRemove={handleRemoveTask} />
    </div>
  );
};

export default Taskpage;








