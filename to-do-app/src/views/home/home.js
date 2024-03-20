import React, { useEffect, useState } from 'react'
import './home.css'
import addIcon from './add.png'
import TaskCard from './../../component/TaskCard/TaskCard'


 function Home() {
    const [tasks, setTasks]=useState([]);
    const [newTask,setNewTask]=useState('');
    const [error,setError]=useState('');
    const [category,setCategory]=useState('');

    const saveTaskTols =(tasksToSave)=>{
      localStorage.setItem('tasks',JSON.stringify(tasksToSave));
    }
    const validateNewTask =()=>{
      if(newTask===''){
        setError('please enter a task')
        return false;
      }
      else{
        setError('')
        return true;
      }
    }
    const addTask = () => {
      const validationResult = validateNewTask();
      if(!validationResult) return;

      const newTasks =[
        {
        title:newTask,
        category:category,
      },
      ...tasks
    ]
      saveTaskTols(newTasks);

      setTasks(newTask)
      setNewTask('')
    }
  
    const deleteTasks =(index)=>{
    const newTasks = tasks;
    newTasks.splice(index,1);
    setTasks([...newTasks]);

    saveTaskTols(newTasks);
    }
    useEffect(()=>{
      if(tasks.length===0){
        return
      }
      saveTaskTols(tasks)
    },[tasks])
    useEffect(()=>{
      const tasks = localStorage.getItem('tasks')
      if(tasks){
        setTasks(JSON.parse(tasks))
      }
    },[])
  return (
    <div>
      <h1 className='app-heading'>ToDo-App</h1>
      <div className='tasks-container'>
        {
        tasks.map((task, i) => {
          const { title, category } = task;
          return(<TaskCard
            title={title}
            category={category}
            key={i}
            delFunction={deleteTasks}
            index={i} 
            />);
        })    
   }  
      </div>
      <p className='error-message'>{error}</p>
      < div className='input-container'>
      <input type='text'
       placeholder='Add a new task' 
       className='task-input'
       value={newTask}
       onChange={(e)=>{
      setNewTask(e.target.value)
       }}
       />
       <select 
       className='category-select'
       value={category} 
       onChange={(e)=>{ 
        setCategory(e.target.value)
        }}>
        <option value=''>Category</option>
        <option value='Study'>🏫Study</option>
        <option value='Shopping'>🛒Shopping</option>
        <option value='Goals'>🥅Goals</option>
        <option value='Hobby'>🏓Hobby</option>
       </select>
      <img
       src={addIcon} 
       alt='Add' 
       className='add-icon'
       onClick={addTask}
       />
    </div>
    </div>
  )
}
export default Home